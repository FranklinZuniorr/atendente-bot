import { HttpClientApi } from '@/configs/axios';
import { generateReactQuery } from '@/helpers/react-query';
import { ReqResponse } from '@/interfaces';

export const GET_AFFILIATE_EXPOSE_TOKEN_KEY = 'GET_AFFILIATE_EXPOSE_TOKEN_KEY';

interface GetAffiliateExposeTokenParams {
    clientId: string;
}

interface GetAffiliateExposeTokenResponse { 
  token: string;
}

const getAffiliateExposeToken = async (params: GetAffiliateExposeTokenParams): Promise<string> => {
  const { clientId } = params;
  const path: string = `api/client/affiliate/expose-link/${clientId}`;
    
  try {
    const response: ReqResponse<GetAffiliateExposeTokenResponse> = (await HttpClientApi.get(path)).data;

    return response.data.token;
  } catch {
    throw new Error(path);
  }
}; 

export const useGetAffiliateExposeToken = generateReactQuery<string, GetAffiliateExposeTokenParams>(GET_AFFILIATE_EXPOSE_TOKEN_KEY, getAffiliateExposeToken);