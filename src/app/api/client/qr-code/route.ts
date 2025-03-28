import { NextResponse } from "next/server";
import { connectDB } from "../../infra/mongoDb";
import { ClientRepository } from "../../repositories/client";
import ClientModel from "../../repositories/client/models/client";
import { IResponse } from "../../interfaces";
import { randomUUID } from "crypto";
import { validadeInstanceStateAndGenerateQrCode } from "../helpers";
import { GenerateQrCodeResponse } from "../interfaces";
import { validateTelephone } from "@/app/utils";

const clientRepository = new ClientRepository(ClientModel, connectDB);

export async function POST(req: Request): Promise<NextResponse<IResponse<GenerateQrCodeResponse>>> {
  try {
    const body = await req.json();

    try {
      const { telephone } = body;
      const authCode = randomUUID();
    
      if (!telephone) {
        return NextResponse.json({ message: 'O telefone é obrigatório!' }, { status: 400 });
      }

      if (!validateTelephone(telephone)) {
        return NextResponse.json({ message: 'Telefone inválido! O formato correto é +55 (XX) 9XXXX-XXXX.' }, { status: 400 });
      }

      try {
        const codes = await validadeInstanceStateAndGenerateQrCode(telephone);

        await clientRepository.upsert({ telephone, authCode });
    
        return NextResponse.json({ data: { code: codes.code, pairingConde: codes.pairingCode, authCode } }, { status: 201 });
      } catch (error) {
        const errorMessage = (error as Error).message;
        return NextResponse.json({ message: errorMessage }, { status: 400 });
      }
    } catch {
      return NextResponse.json({ message: 'Não foi possível gerar o Qr-code!' }, { status: 400 });
    }
  } catch {
    return NextResponse.json({ message: 'Nenhum dado enviado!' }, { status: 400 });
  }
}

