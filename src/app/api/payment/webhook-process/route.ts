import { NextResponse } from 'next/server';
import { IResponse } from '../../interfaces';
import { StripeWebhookProcessBody } from '../interfaces';
import { connectDB } from '../../infra/mongoDb';
import ClientModel from '../../repositories/client/models/client';
import { ClientRepository } from '../../repositories/client';
import { AffiliateRepository } from '../../repositories/affiliate';
import AffiliateSellModel from '../../repositories/affiliate/models/affiliate';
import { GetClientRepositoryResponse } from '../../repositories/client/interfaces';
import { decodeToken } from '../../utils';
import { AffiliateTokenInfos } from '../../client/interfaces';

const clientRepository = new ClientRepository(ClientModel, connectDB);
const affiliateRepository = new AffiliateRepository(AffiliateSellModel, connectDB);

export async function POST(req: Request): Promise<NextResponse<IResponse>> {
  try {
    const body = await req.json();
         
    try {
      const response: StripeWebhookProcessBody = body;
      const { clientId, qty } = response.data.object.metadata;
      const status = response.data.object.status;

      if(status !== 'complete' || !clientId) return NextResponse.json({ }, { status: 202 });
      await clientRepository.incrementClientTokens(clientId, qty);

      const clientInDataBase: GetClientRepositoryResponse = await clientRepository.getById(clientId);

      const { affiliateTokenInfosJwt } = clientInDataBase;
      
      const affiliateInfos: AffiliateTokenInfos | null = decodeToken(affiliateTokenInfosJwt || '');

      if (affiliateInfos) {
        await affiliateRepository.createSell({ 
          value: response.data.object.amount_total, 
          invoiceId: response.data.object.payment_intent, 
          affiliateId: affiliateInfos._id,
          client: {
            clientId,
            name: response.data.object.customer_details.name,
            telephone: clientInDataBase.telephone
          } 
        });
      }

      return NextResponse.json({ }, { status: 200 });
    } catch {
      return NextResponse.json({ message: 'Não foi possível processar o pagamento!' }, { status: 203 });
    }
  } catch {
    return NextResponse.json({ message: 'Nenhum dado encontrado no corpo da requisição!' }, { status: 202 });
  }
}