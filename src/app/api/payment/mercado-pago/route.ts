import { IResponse } from '@/app/api/interfaces';
import { NextResponse } from 'next/server';
import { checkClientMiddleware } from '@/app/api/middlewares/check-client/middleware';
import { MercadoPagoConfig, Preference } from 'mercadopago';
import { ENVS } from '@/constants';

const mercadoPagoConfig = new MercadoPagoConfig({ accessToken: ENVS.mercadoPagoAccessToken || '' });

export async function GET(req: Request): Promise<NextResponse<IResponse<{ id: string }>>> {
  
  const execute = async () => {
    const url = new URL(req.url);
    const clientId = url.searchParams.get('clientId');
      
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
            quantity: 1,
            unit_price: 19.99
          }
        ],
        metadata: {
          clientId,
          qty: 300
        },
        back_urls: {
          success: ENVS.mercadoPagoCallbackUrlSuccess,
          failure: ENVS.mercadoPagoCallbackUrlError,
        },
        auto_return: 'approved',
      }
    });
    
    if (!preferenceId) {
      return NextResponse.json({ message: 'Protocolo de pagamento não foi gerado!' }, { status: 400 });
    }

    return NextResponse.json<IResponse<{ id: string }>>({ data: { id: preferenceId } }, { status: 200 });
  };
    
  return await checkClientMiddleware(req, execute);
}
