import { HttpClientApi } from '@/configs/axios';
import { generateReactQuery } from '@/helpers/react-query';

export const GET_MERCADO_PAGO_URL_KEY = 'GET_MERCADO_PAGO_URL_KEY';

interface GetMercadoPagoUrlReturn {
    data: {
        url: string;
    }
}

interface GetMercadoPagoUrlParams {
  clientId: string;
  itemQty: number
}

const getMercadoPagoUrl = async (params: GetMercadoPagoUrlParams): Promise<string> => {
  const { clientId, itemQty } = params;
  const path: string = 'api/payment/mercado-pago';

  try {
    const response: GetMercadoPagoUrlReturn = (await HttpClientApi.get(path, { params: { clientId, itemQty } })).data;
    return response.data.url;
  } catch {
    throw new Error(path);
  }
};

export const useGetMercadoPagoUrl = generateReactQuery<string, GetMercadoPagoUrlParams>(GET_MERCADO_PAGO_URL_KEY, getMercadoPagoUrl);