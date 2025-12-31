import { NextResponse } from 'next/server';
import { MercadoPagoService } from '@/app/api/services/mercado-pago';
import { MercadoPagoPaymentResponse } from '@/app/api/services/mercado-pago/interfaces';
import { ClientRepository } from '@/app/api/repositories/client';
import { AffiliateRepository } from '@/app/api/repositories/affiliate';
import ClientModel from '@/app/api/repositories/client/models/client';
import { connectDB } from '@/app/api/infra/mongoDb';
import AffiliateSellModel from '@/app/api/repositories/affiliate/models/affiliate';
import { IResponse } from '@/app/api/interfaces';
import { MercadoPagoWebhookProcessBody } from '../../interfaces';
import { GetClientRepositoryResponse } from '@/app/api/repositories/client/interfaces';
import { decodeToken } from '@/app/api/utils';
import { AffiliateTokenInfos } from '@/app/api/client/interfaces';

export async function POST(req: Request): Promise<NextResponse<IResponse>> {

  const clientRepository = new ClientRepository(ClientModel, connectDB);
  await clientRepository.connect();

  const affiliateRepository = new AffiliateRepository(AffiliateSellModel, connectDB);
  await affiliateRepository.connect();

  try {
    const body = await req.json();
         
    try {
      const response: MercadoPagoWebhookProcessBody = body;
      const { data: { id: paymentId } } = response;
      
      const paymentInfos: MercadoPagoPaymentResponse = await MercadoPagoService.getPayment(paymentId);

      const { 
        status, 
        metadata: { client_id: clientId, qty }, 
        transaction_details: { total_paid_amount },
        payer: { email, first_name }
      } = paymentInfos;

      if(status !== 'approved' || !clientId) return NextResponse.json({ }, { status: 202 });
      await clientRepository.incrementClientTokens(clientId, qty);

      const clientInDataBase: GetClientRepositoryResponse = await clientRepository.getById(clientId);

      const { affiliateTokenInfosJwt } = clientInDataBase;
      
      const affiliateInfos: AffiliateTokenInfos | null = decodeToken(affiliateTokenInfosJwt || '');

      if (affiliateInfos) {
        await affiliateRepository.createSell({ 
          value: total_paid_amount, 
          invoiceId: paymentId, 
          affiliateId: affiliateInfos._id,
          isPaid: false,
          client: {
            clientId,
            name: first_name || email || 'Sem nome',
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