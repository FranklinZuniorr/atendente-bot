import { NextResponse } from "next/server";
import { ClientRepository } from "../repositories/client";
import ClientModel from "../repositories/client/models/client";
import { connectDB } from "../infra/mongoDb";
import { IResponse } from "../interfaces";
import { GetClientResponse } from "./interfaces";
import { GetClientByTelephoneResponse } from "../repositories/client/interfaces";
import { validateTelephone } from "@/app/utils";
import { EvolutionService } from "../services/evolution";
import { ENUM_EVOLUTION_CONNECTION_STATE } from "../services/evolution/constants";


const clientRepository = new ClientRepository(ClientModel, connectDB);

export async function GET(req: Request): Promise<NextResponse<IResponse<GetClientResponse>>> {
    try {
        const { url } = req;
        const{ searchParams } = new URL(url);
        const telephone = searchParams.get("telephone");
        const authCode = searchParams.get("authCode");

        if (!telephone) {
            return NextResponse.json({ message: "Telefone é obrigatório!" }, { status: 400 });
        }

        if (!authCode) {
            return NextResponse.json({ message: "Código de autorização é obrigatório!" }, { status: 400 });
        }

        if (!validateTelephone(telephone)) {
            return NextResponse.json({ message: 'Telefone inválido! O formato correto é +55 (XX) 9XXXX-XXXX.' }, { status: 400 });
        }

        const responseInstanceState: ENUM_EVOLUTION_CONNECTION_STATE = 
        (await EvolutionService.getState(telephone)).instance.state;
        const isConnected = responseInstanceState === ENUM_EVOLUTION_CONNECTION_STATE.OPEN;

        if (!isConnected) {
            return NextResponse.json({ message: 'Esse telefone não está conectado!' }, { status: 403 });
        }

        try {
            const client: GetClientByTelephoneResponse = await clientRepository.getByTelephone(telephone);

            if (authCode !== client.authCode) {
                return NextResponse.json({ message: 'Código de autorização inválido!' }, { status: 403 });
            }

            return NextResponse.json({ data: client }, { status: 200 });
        } catch {
            return NextResponse.json({ message: 'Cliente não encontrado!' }, { status: 404 });
        }
        
    } catch {
        return NextResponse.json({ message: 'Não foi possível obter os dados do telefone!' }, { status: 404 });
    }
}
