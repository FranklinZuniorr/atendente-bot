import { HttpClientApi } from '@/app/configs/axios';
import { generateReactQuery } from '@/app/helpers/react-query';

export const GET_MERCADO_PAGO_PREFERENCE_ID_KEY = 'GET_MERCADO_PAGO_PREFERENCE_ID_KEY';

interface GetMercadoPagoPreferenceIdReturn {
    data: {
        id: string;
    }
}

const getMercadoPagoPreferenceId = async (clientId: string): Promise<string> => {
  const path: string = 'api/payment/mercado-pago';

  try {
    const response: GetMercadoPagoPreferenceIdReturn = (await HttpClientApi.get(path, { params: { clientId } })).data;
    return response.data.id;
  } catch {
    throw new Error(path);
  }
};

export const useGetMercadoPagoPreferenceId = generateReactQuery<string, string>(GET_MERCADO_PAGO_PREFERENCE_ID_KEY, getMercadoPagoPreferenceId);