import { HttpClientApi } from '../configs/axios';
import { queryClient } from '../configs/react-query';
import { generateReactQuery } from '../helpers/react-query';
import { ReqResponse } from '../interfaces';

export const KEY_GET_ALL_INFOS = 'KEY_GET_ALL_INFOS';

export interface GetAllInfosExternalResponse {
    _id: string,
    title: string,
    description: string,
    clientId: string,
    createdAt: string,
    updatedAt: string,
}

export const invalidateGetAllInfos = (clientId?: string) => {
  if(clientId) {
    queryClient.invalidateQueries({ queryKey: [KEY_GET_ALL_INFOS, clientId] });
  } else {
    queryClient.invalidateQueries({ queryKey: [KEY_GET_ALL_INFOS] });
  }
};

const fn = async (clientId: string): Promise<GetAllInfosExternalResponse[]> => {
  const path: string = 'api/info/all-by-client';
    
  try {
    const response: ReqResponse<GetAllInfosExternalResponse[]> = (await HttpClientApi.get(path, { params: { clientId } })).data;

    return response.data;
  } catch {
    throw new Error(path);
  }
};

export const useGetAllInfos = generateReactQuery<GetAllInfosExternalResponse[], string>(KEY_GET_ALL_INFOS, fn);