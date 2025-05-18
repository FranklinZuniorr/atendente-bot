import { StripeCheckoutParams } from '../../services/stripe/interfaces';

export interface PaymentCheckoutGetUrl {
    url: string;
}

export interface StripeWebhookProcessBody {
    id: string,
    object: string,
    api_version: string,
    created: number,
    data: {
      object: {
        id: string,
        object: string,
        amount: number,
        amount_capturable: number,
        amount_received: number,
        currency: string,
        metadata: StripeCheckoutParams,
        status: string
      }
    }
  }