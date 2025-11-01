import { HttpClientApi } from '../configs/axios';
import { generateReactQueryMutation } from '../helpers/react-query';

export const KEY_POST_NEW_INFO = 'KEY_POST_NEW_INFO';

export interface PostNewInfoParams {
	title: string,
	description: string,
	clientId: string
}

export const fn = async (parmas: PostNewInfoParams) => {
  const path: string = 'api/info';

  try {
    await HttpClientApi.post(path, parmas);
  } catch {
    throw new Error(path);
  }
};

export const usePostNewInfo = generateReactQueryMutation<void, PostNewInfoParams>(KEY_POST_NEW_INFO, fn);