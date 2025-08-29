import { IResponse } from '@/app/api/interfaces';
import { NextResponse } from 'next/server';
import { checkClientMiddleware } from '@/app/api/middlewares/check-client/middleware';
import { MercadoPagoGetCheckoutUrl } from '../interfaces';
import { generateMercadoPagoUrl } from '../helpers';

export async function GET(req: Request): Promise<NextResponse<IResponse<MercadoPagoGetCheckoutUrl>>> {
  
  const execute = async () => {
    const url = new URL(req.url);
    const clientId = url.searchParams.get('clientId');
    const itemQty: number = Number(url.searchParams.get('itemQty'));

    if (!clientId) {
      return NextResponse.json({ message: 'O id do cliente é obrigatório!' }, { status: 400 });
    }

    try {
      const mercadoPagoCheckoutUrl = await generateMercadoPagoUrl({ clientId, itemQty });
  
      return NextResponse.json<IResponse<MercadoPagoGetCheckoutUrl>>({ data: { url: mercadoPagoCheckoutUrl.url } }, { status: 200 });
    } catch  {
      return NextResponse.json({ message: 'Protocolo de pagamento não foi gerado!' }, { status: 400 });
    }
  };
    
  return await checkClientMiddleware(req, execute);
}
