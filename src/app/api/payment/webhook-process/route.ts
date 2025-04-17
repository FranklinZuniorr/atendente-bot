import { NextResponse } from 'next/server';
import { IResponse } from '../../interfaces';
import { StripeWebhookProcessBody } from '../interfaces';
import { connectDB } from '../../infra/mongoDb';
import ClientModel from '../../repositories/client/models/client';
import { ClientRepository } from '../../repositories/client';

const clientRepository = new ClientRepository(ClientModel, connectDB);

export async function POST(req: Request): Promise<NextResponse<IResponse>> {
  try {
    const body = await req.json();
         
    try {
      const response: StripeWebhookProcessBody = body;
      const { clientId, qty } = response.data.object.metadata;
      const status = response.data.object.status;

      if(status !== 'complete' || !clientId) return NextResponse.json({ }, { status: 202 });
      await clientRepository.incrementClientTokens(clientId, qty);

      return NextResponse.json({ }, { status: 200 });
    } catch {
      return NextResponse.json({ message: 'Não foi possível processar o pagamento!' }, { status: 203 });
    }
  } catch {
    return NextResponse.json({ message: 'Nenhum dado encontrado no corpo da requisição!' }, { status: 202 });
  }
}