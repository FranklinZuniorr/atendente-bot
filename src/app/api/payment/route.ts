import { NextResponse } from 'next/server';
import { IResponse } from '../interfaces';
import { checkClientMiddleware } from '../middlewares/check-client/middleware';
import { PaymentCheckoutGetUrl } from './interfaces';
import { StripeService } from '../services/stripe';

export async function POST(req: Request): Promise<NextResponse<IResponse<PaymentCheckoutGetUrl>>> {
  const execute = async () => {
    try {
      const body = await req.json();
       
      try {
        const { clientId } = body;

        if (!clientId || typeof clientId !== 'string') {
          return NextResponse.
            json({ message: 'O id do cliente é obrigatório e precisa ser do tipo string!' }, { status: 400 });
        }

        const responseCheckout = await StripeService.checkout({clientId, qty: 100});

        return NextResponse.json({ data: responseCheckout }, { status: 200 });
      } catch {
        return NextResponse.json({ message: 'Não foi possível gerar a url de pagamento!' }, { status: 400 });
      }
    } catch {
      return NextResponse.json({ message: 'Nenhum dado encontrado no corpo da requisição!' }, { status: 400 });
    }
  };

  return await checkClientMiddleware(req, execute);
}