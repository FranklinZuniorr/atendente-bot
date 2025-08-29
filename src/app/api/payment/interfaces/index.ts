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
        amount_total: number;
        currency: string,
        payment_intent: string;
        metadata: StripeCheckoutParams,
        status: string
        customer_details: {
          name: string;
        }
      }
    }
  }

export interface MercadoPagoWebhookProcessBody {
  action: string,
  api_version: string,
  data: {
    id: string
  },
  date_created: string,
  id: number,
  live_mode: boolean,
  type: string,
  user_id: number
}

export interface MercadoPagoGetCheckoutUrl {
  url: string
}

export interface GenerateMercadoPagoUrlParams {
  clientId: string;
  itemQty: number;
}