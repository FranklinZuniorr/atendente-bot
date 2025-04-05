import { HttpClientApi } from '../configs/axios';
import { generateReactQueryMutation } from '../helpers/react-query';

export const KEY_PUT_INFO = 'KEY_PUT_INFO';

export interface PutInfoParams {
	infoId: string,
	description?: string,
	title?: string
}

const fn = async (params: PutInfoParams) => {
  const path: string = 'api/info';

  try {
    await HttpClientApi.put(path, params);
  } catch {
    throw new Error(path);
  }
};

export const usePutInfo = generateReactQueryMutation<void, PutInfoParams>(KEY_PUT_INFO, fn);