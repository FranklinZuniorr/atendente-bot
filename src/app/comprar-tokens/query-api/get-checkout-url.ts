import { HttpClientApi } from '@/app/configs/axios';
import { generateReactQuery } from '@/app/helpers/react-query';

export const KEY_GET_CHECKOUT_URL = 'KEY_GET_CHECKOUT_URL';

interface GetCheckoutUrlParams {
    clientId: string;
}

interface GetCheckoutUrlReturn {
    data: {
        url: string;
    }
}

const getCheckoutUrl = async (params: GetCheckoutUrlParams): Promise<GetCheckoutUrlReturn> => {
  const path: string = 'api/payment';

  try {
    const response: GetCheckoutUrlReturn = (await HttpClientApi.post(path, params)).data;
    return response;
  } catch {
    throw new Error(path);
  }
};

export const useGetCheckoutUrl = 
generateReactQuery<GetCheckoutUrlReturn, GetCheckoutUrlParams>(KEY_GET_CHECKOUT_URL, getCheckoutUrl);