import { HttpClientApi } from '../configs/axios';
import { generateReactQueryMutation } from '../helpers/react-query';

export const KEY_DELETE_INFO = 'KEY_DELETE_INFO';

export interface DeleteInfoParams {
    infoId: string;
}

const fn = async (params: DeleteInfoParams) => {
  const path: string = 'api/info';

  try {
    await HttpClientApi.delete(path, {  data: params });
  } catch {
    throw new Error(path);
  }
};

export const useDeleteInfo = generateReactQueryMutation<void, DeleteInfoParams>(KEY_DELETE_INFO, fn);