import { AUTH_CODE_LOCAL_STORAGE_KEY, TELEPHONE_LOCAL_STORAGE_KEY } from '@/constants';
import { AuthService } from '../services/auth';
import { AuthServiceCheckClientResponse } from '../services/auth/interfaces';
import { storeRedux } from '../configs/redux/store';
import { initialStateClientReduxState, setClient } from '../configs/redux/slices/clientSlice';
import { setAuthorizationMetadata } from '../configs/axios';

export const setClientGlobalStateRedux = async () => {
  const authCode = localStorage.getItem(AUTH_CODE_LOCAL_STORAGE_KEY);
  const telephone = localStorage.getItem(TELEPHONE_LOCAL_STORAGE_KEY);

  if (!authCode || !telephone) return;

  try {
    const client: AuthServiceCheckClientResponse = (await AuthService.checkClient({ telephone, authCode })).data;
    storeRedux.dispatch(setClient({
      id: client._id,
      authCode: client.authCode,
      createdAt: client.createdAt,
      messageTokens: client.messageTokens,
      telephone: client.telephone,
      updatedAt: client.createdAt
    }));
    setAuthorizationMetadata(authCode, telephone);
  } catch {
    localStorage.removeItem(AUTH_CODE_LOCAL_STORAGE_KEY);
    localStorage.removeItem(TELEPHONE_LOCAL_STORAGE_KEY);
    storeRedux.dispatch(setClient(initialStateClientReduxState));
    setAuthorizationMetadata('', '');
  }
};

export const removePhoneFormatting = (telefone: string): string => {
  return telefone.replace(/\D/g, '');
};