import { ENVS } from '@/constants';
import Stripe from 'stripe';
import { StripeCheckoutParams, StripeCheckoutResponse } from './interfaces';

export class StripeService {
  private static API_KEY = ENVS.stripeApiCompleteKey || '';
  private static stripe = new Stripe(this.API_KEY);

  static async checkout(params: StripeCheckoutParams): Promise<StripeCheckoutResponse> {
    const { clientId, qty } = params;
    try {
      const session = (await this.stripe.checkout.sessions.create({
        success_url: ENVS.stripeCallbackUrl,
        cancel_url: ENVS.stripeCallbackUrl,
        line_items: [
          {
            price: ENVS.stripePriceKey,
            quantity: 1,
          },
        ],
        metadata: {
          clientId,
          qty
        },
        mode: 'payment',
      }));

      return { url: session.url || '' };
    } catch {
      throw new Error('Stripe checkout error!');   
    }
  }
}