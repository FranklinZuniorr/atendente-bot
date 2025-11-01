import { ReqResponse } from '@/interfaces';
import { UserActivityExternal } from '../interfaces';
import { HttpClientApi } from '@/configs/axios';
import { generateReactQuery } from '@/helpers/react-query';
import { queryClient } from '@/configs/react-query';

export const GET_ALL_USER_ACTIVITY_PAGINATED_KEY = 'GET_ALL_USER_ACTIVITY_PAGINATED_KEY';

interface GetAllUserActivityPaginatedParams {
    clientId: string;
    page: number;
    pageSize: number;
}

interface GetAllUserActivityPaginatedResponse {
  activities: UserActivityExternal[];
  total: number;
}

export const invalidateGetAllUserActivityPaginated = (params?: GetAllUserActivityPaginatedParams) => {
  queryClient.invalidateQueries({ queryKey: params ? [GET_ALL_USER_ACTIVITY_PAGINATED_KEY, params] : [GET_ALL_USER_ACTIVITY_PAGINATED_KEY] });
};

const getAllUserActivityPaginated = async (params: GetAllUserActivityPaginatedParams): Promise<GetAllUserActivityPaginatedResponse> => {
  const path: string = 'api/user-activity';

  try {
    const response: ReqResponse<GetAllUserActivityPaginatedResponse> = (await HttpClientApi.get(path, { params })).data;
    
    return response.data;
  } catch {
    throw new Error(path);
  }
};

export const useGetAllUserActivityPaginated = 
generateReactQuery<GetAllUserActivityPaginatedResponse, GetAllUserActivityPaginatedParams>(
  GET_ALL_USER_ACTIVITY_PAGINATED_KEY, 
  getAllUserActivityPaginated
);