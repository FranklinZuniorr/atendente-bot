import { NextResponse } from 'next/server';
import { IResponse } from '../../interfaces';
import { validateTelephone } from '@/app/utils';
import { ENUM_EVOLUTION_CONNECTION_STATE } from '../../services/evolution/constants';
import { EvolutionService } from '../../services/evolution';
import { GetClientByTelephoneResponse } from '../../repositories/client/interfaces';
import { ClientRepository } from '../../repositories/client';
import ClientModel from '../../repositories/client/models/client';
import { connectDB } from '../../infra/mongoDb';

const clientRepository = new ClientRepository(ClientModel, connectDB);

export const checkClientMiddleware = async <TResponseData = unknown>(request: Request, fn: () => Promise<NextResponse<IResponse<TResponseData>>>): Promise<NextResponse<IResponse<TResponseData>>> => {
  const authCode = request.headers.get('authCode');
  const telephone = request.headers.get('telephone');

  if (!authCode) return NextResponse.json({ message: 'O código de autorização é obrigatório no cabeçalho!'}, { status: 400 });
  if (!telephone) return NextResponse.json({ message: 'O telefone é obrigatório no cabeçalho!'}, { status: 400 });
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

    return fn();
  } catch {
    return NextResponse.json({ message: 'Cliente não encontrado!' }, { status: 404 });
  }
};