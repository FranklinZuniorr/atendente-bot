import { NextResponse } from "next/server";
import { connectDB } from "../../infra/mongoDb";
import { ClientRepository } from "../../repositories/client";
import Client from "../../repositories/client/models/client";
import { IResponse } from "../../interfaces";

const clientRepository = new ClientRepository(Client, connectDB);

export async function POST(req: Request): Promise<NextResponse<IResponse>> {
  try {
    const body = await req.json();

    try {
      const { telephone } = body;
    
      if (!telephone) {
        return NextResponse.json({ message: 'O telefone é obrigatório!' }, { status: 400 });
      }

      const phoneRegex = /^\+?55\s?\(?\d{2}\)?\s?9\d{4}-?\d{4}$/;

      if (!phoneRegex.test(telephone)) {
        return NextResponse.json({ message: 'Telefone inválido! O formato correto é +55 (XX) 9XXXX-XXXX.' }, { status: 400 });
      }

      await clientRepository.upsert({ telephone, authCode: '' });
    
      return NextResponse.json({ message: 'Qr-code gerado com sucesso!' }, { status: 201 });
    } catch {
      return NextResponse.json({ message: 'Não foi possível gerar o Qr-code!' }, { status: 400 });
    }
  } catch {
    return NextResponse.json({ message: 'Nenhum dado enviado!' }, { status: 400 });
  }
}

