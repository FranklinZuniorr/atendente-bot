export const ENVS = {
  evolutionBaseUrl: process.env.EVOLUTION_BASE_URL,
  evolutionApiKey: process.env.EVOLUTION_API_KEY,
  mongoUrl: process.env.MONGO_URL,
  webhookNext: process.env.WEBHOOK_NEXT,
  openAiBaseUrl: process.env.OPEN_AI_BASE_URL,
  openAiApiKey: process.env.OPEN_AI_API_KEY,
  stripeCallbackUrlSuccess: process.env.STRIPE_CALLBACK_URL_SUCCESS,
  stripeCallbackUrlError: process.env.STRIPE_CALLBACK_URL_ERROR,
  stripeApiCompleteKey: process.env.STRIPE_API_COMPLETE_KEY,
  stripePriceKey: process.env.STRIPE_PRICE_KEY,
  mercadoPagoBaseUrl: process.env.MERCADO_PAGO_BASE_URL,
  mercadoPagoAccessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN,
  mercadoPagoPublicKey: process.env.NEXT_PUBLIC_MERCADO_PAGO_PUBLIC_KEY,
  mercadoPagoCallbackUrlSuccess: process.env.STRIPE_CALLBACK_URL_SUCCESS,
  mercadoPagoCallbackUrlError: process.env.STRIPE_CALLBACK_URL_ERROR,
};

export const AUTH_CODE_LOCAL_STORAGE_KEY = 'AUTH_CODE_LOCAL_STORAGE_KEY';
export const TELEPHONE_LOCAL_STORAGE_KEY = 'TELEPHONE_LOCAL_STORAGE_KEY';
export const META_DATA_LOGIN_LOCAL_STORAGE_KEY = 'META_DATA_LOGIN_LOCAL_STORAGE_KEY';

export const COLORS = {
  main: '#009CFF',
  mainLow: '#9DD9FF',
  red: '#FF0000'
};