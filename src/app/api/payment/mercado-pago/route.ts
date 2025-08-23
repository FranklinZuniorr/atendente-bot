import { IResponse } from '@/app/api/interfaces';
import { NextResponse } from 'next/server';
import { checkClientMiddleware } from '@/app/api/middlewares/check-client/middleware';
import { MercadoPagoConfig, Preference } from 'mercadopago';
import { ENVS } from '@/constants';
import { randomUUID } from 'crypto';
import { MercadoPagoGetCheckoutUrl } from '../interfaces';

const mercadoPagoConfig = new MercadoPagoConfig({ accessToken: ENVS.mercadoPagoAccessToken || '' });

export async function GET(req: Request): Promise<NextResponse<IResponse<MercadoPagoGetCheckoutUrl>>> {
  
  const execute = async () => {
    const url = new URL(req.url);
    const clientId = url.searchParams.get('clientId');
    const itemQty: number = Number(url.searchParams.get('itemQty'));
    const uuid = randomUUID();

    const tokensQty = itemQty * 300;
      
    if (!clientId) {
      return NextResponse.json({ message: 'O id do cliente é obrigatório!' }, { status: 400 });
    }

    const preference = new Preference(mercadoPagoConfig);

    const { id: preferenceId } = await preference.create({
      body: {
        items: [
          {
            id: clientId,
            title: '+300 Tokens para respostas humanizadas com IA',
            quantity: itemQty,
            unit_price: 19.99
          }
        ],
        metadata: {
          clientId,
          qty: tokensQty
        },
        back_urls: {
          success: ENVS.mercadoPagoCallbackUrlSuccess,
          failure: ENVS.mercadoPagoCallbackUrlError,
        },
        auto_return: 'approved',
        redirect_urls: { 
          success: ENVS.mercadoPagoCallbackUrlSuccess, 
          failure: ENVS.mercadoPagoCallbackUrlError, 
        }
      }
    });
    
    if (!preferenceId) {
      return NextResponse.json({ message: 'Protocolo de pagamento não foi gerado!' }, { status: 400 });
    }

    const mercadoPagoCheckoutUrl = `https://www.mercadopago.com.br/checkout/v1/payment/redirect/${uuid}/review/?preference-id=${preferenceId}`;

    return NextResponse.json<IResponse<MercadoPagoGetCheckoutUrl>>({ data: { url: mercadoPagoCheckoutUrl } }, { status: 200 });
  };
    
  return await checkClientMiddleware(req, execute);
}
