import { ReqResponse } from '@/app/interfaces';
import { AffiliateSellExternal } from '../interfaces';
import { HttpClientApi } from '@/app/configs/axios';
import { generateReactQuery } from '@/app/helpers/react-query';

export const GET_ALL_AFFILIATE_SELLS_KEY = 'GET_ALL_AFFILIATE_SELLS_KEY';

interface GetAllAffiliateSellsParams {
    clientId: string;
}

interface GetAllAffiliateSellsResponse { 
  sells: AffiliateSellExternal[]
}

const getAllAffiliateSells = async (params: GetAllAffiliateSellsParams): Promise<AffiliateSellExternal[]> => {
  const { clientId } = params;
  const path: string = `api/client/affiliate/all-sells/${clientId}`;
      
  try {
    const response: ReqResponse<GetAllAffiliateSellsResponse> = (await HttpClientApi.get(path)).data;
  
    return response.data.sells;
  } catch {
    throw new Error(path);
  }
}; 

export const useGetAllAffiliateSells = generateReactQuery<AffiliateSellExternal[], GetAllAffiliateSellsParams>(GET_ALL_AFFILIATE_SELLS_KEY, getAllAffiliateSells);