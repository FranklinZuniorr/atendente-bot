import { AUTH_CODE_LOCAL_STORAGE_KEY, TELEPHONE_LOCAL_STORAGE_KEY } from '@/constants';
import axios, { AxiosError, AxiosResponse } from 'axios';
import toast from 'react-hot-toast';

export const setAuthorizationMetadata = (authCode: string, telephone: string) => {
  HttpClientApi.defaults.headers.common = { 
    authCode,
    telephone
  };
};

export const HttpClientApi = axios.create();

const handleSuccess = async (response: AxiosResponse) => {
  const { status } = response;
  const isSuccess: boolean = status >= 200 && status <= 299;
  
  if (!isSuccess) {
    toast.error(response.data.message || 'Erro na solicitação!');
    return Promise.reject(false);
  }
  
  if (isSuccess) {
    const rejectedPaths = new Set(['api/payment']);
    if (response.config.method !== 'get' && !rejectedPaths.has(response.config.url as string)) {
      toast.success(response.data.message || 'Solicitação concluída!');
    }
  }
  
  return response;
};
  
const handleError = async (error: AxiosError) => {
  if (error.response) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const message: string = (error.response.data as any).message as string;
    if (error.config?.method !== 'get') {
      toast.error(message || 'Erro na solicitação!');
    }

    if (error.status === 403) {
      localStorage.removeItem(AUTH_CODE_LOCAL_STORAGE_KEY);
      localStorage.removeItem(TELEPHONE_LOCAL_STORAGE_KEY);
      window.location.reload();
    }

    return Promise.reject(error);
  }
  toast.error(`${error.code}: ${error.message}`);
  return Promise.reject(error);
};

HttpClientApi.interceptors.response.use(handleSuccess, handleError);