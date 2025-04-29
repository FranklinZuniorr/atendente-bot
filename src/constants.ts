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
  stripePriceKey: process.env.STRIPE_PRICE_KEY
};

export const AUTH_CODE_LOCAL_STORAGE_KEY = 'AUTH_CODE_LOCAL_STORAGE_KEY';
export const TELEPHONE_LOCAL_STORAGE_KEY = 'TELEPHONE_LOCAL_STORAGE_KEY';
export const CODES_LOCAL_STORAGE_KEY = 'CODES_LOCAL_STORAGE_KEY';

export const COLORS = {
  main: '#009CFF',
  mainLow: '#9DD9FF',
  red: '#FF0000'
};