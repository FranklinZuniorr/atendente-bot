import { HttpClientApi } from '@/app/configs/axios';
import { generateReactQueryMutation } from '@/app/helpers/react-query';

export const PUT_USER_ACTIVITY_STATUS_KEY = 'PUT_USER_ACTIVITY_STATUS_KEY';

interface PutUserActivityStatusParams {
    status: boolean;
    id: string;
}

const putUserActivityStatus = async (params: PutUserActivityStatusParams): Promise<void> => {
  const path: string = 'api/user-activity/status';

  try {
    await HttpClientApi.put(path, params);
  } catch {
    throw new Error(path);
  }
};

export const usePutUserActivityStatus = 
generateReactQueryMutation<void, PutUserActivityStatusParams>(PUT_USER_ACTIVITY_STATUS_KEY, putUserActivityStatus);