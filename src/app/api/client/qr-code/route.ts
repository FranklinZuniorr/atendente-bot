import { NextResponse } from 'next/server';
import { connectDB } from '../../infra/mongoDb';
import { ClientRepository } from '../../repositories/client';
import ClientModel from '../../repositories/client/models/client';
import { IResponse } from '../../interfaces';
import { randomUUID } from 'crypto';
import { validadeInstanceStateAndGenerateQrCode } from '../helpers';
import { GenerateQrCodeResponse } from '../interfaces';
import { validateTelephone } from '@/app/utils';
import { EvolutionService } from '../../services/evolution';
import { ENUM_EVOLUTION_CONNECTION_STATE } from '../../services/evolution/constants';
import { EvolutionInstanceConnectReturn } from '../../services/evolution/interfaces';

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

      let delayGenerateCodes = 2000;

      try {
        const instance = await EvolutionService.getState(telephone);

        switch (instance.instance.state) {
        case ENUM_EVOLUTION_CONNECTION_STATE.CONNECTING:
          await EvolutionService.deleteInstance(telephone);
          break;
        case ENUM_EVOLUTION_CONNECTION_STATE.OPEN:
          return NextResponse.json({ message: 'Esse telefone já está conectado!' }, { status: 400 });
        case ENUM_EVOLUTION_CONNECTION_STATE.CLOSE:
          await EvolutionService.deleteInstance(telephone);
          break;
        default:
          delayGenerateCodes = 0;
          break;
        }
      } catch {
        return NextResponse.json({ message: 'Não foi possível deletar a instância!' }, { status: 500 });
      }

      try {
        const codes: EvolutionInstanceConnectReturn = await new Promise((resolve) => {
          setTimeout(() => {
            resolve(validadeInstanceStateAndGenerateQrCode(telephone));
          }, delayGenerateCodes);
        });
        
        try {
          await clientRepository.getByTelephone(telephone);
          await clientRepository.upsert({ telephone, authCode });
        } catch  {
          await clientRepository.upsert({ telephone, authCode, messageTokens: 0 });
        }

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

