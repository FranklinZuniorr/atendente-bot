import { MercadoPagoConfig, Preference } from 'mercadopago';
import { ENVS } from '@/constants';
import { randomUUID } from 'crypto';
import { GenerateMercadoPagoUrlParams, MercadoPagoGetCheckoutUrl } from '../interfaces';

const mercadoPagoConfig = new MercadoPagoConfig({ accessToken: ENVS.mercadoPagoAccessToken || '' });

export const generateMercadoPagoUrl = async (params: GenerateMercadoPagoUrlParams): Promise<MercadoPagoGetCheckoutUrl> => {
  const { clientId, itemQty } = params;
  const uuid = randomUUID();

  const tokensQty = itemQty * 300;

  try {
    const preference = new Preference(mercadoPagoConfig);
    
    const { id: preferenceId } = await preference.create({
      body: {
        items: [
          {
            id: clientId,
            title: `+${tokensQty} Tokens para respostas humanizadas com IA`,
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
    
    const mercadoPagoCheckoutUrl = `https://www.mercadopago.com.br/checkout/v1/payment/redirect/${uuid}/review/?preference-id=${preferenceId}`;
    
    return { url: mercadoPagoCheckoutUrl };
  } catch {
    throw new Error('Url don\'t generated!');
  }

};

