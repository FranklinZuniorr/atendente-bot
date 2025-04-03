'use client';

import { ReactNode, useEffect, useState } from 'react';
import { GlobalLoading } from '../global-loading';
import { usePathname, useRouter } from 'next/navigation';
import { AUTH_CODE_LOCAL_STORAGE_KEY, TELEPHONE_LOCAL_STORAGE_KEY } from '@/constants';
import { useAppDispatch, useAppSelector } from '@/app/configs/redux/store';
import { AuthService } from '@/app/services/auth';
import { initialStateClientReduxState, setClient } from '@/app/configs/redux/slices/clientSlice';
import { setAuthorizationMetadata } from '@/app/configs/axios';

interface AuthMiddlewareProps {
  children: ReactNode;
}

export const AuthMiddleware = ({ children }: AuthMiddlewareProps) => {
  const navigate = useRouter();
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const client = useAppSelector(state => state.client);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const handleLastAccess = async () => {
    const authCode = localStorage.getItem(AUTH_CODE_LOCAL_STORAGE_KEY);
    const telephone = localStorage.getItem(TELEPHONE_LOCAL_STORAGE_KEY);
  
    if (authCode && telephone) {
      try {
        const client = (await AuthService.checkClient({ authCode, telephone })).data;
        dispatch(setClient({
          id: client._id,
          authCode: client.authCode,
          createdAt: client.createdAt,
          messageTokens: client.messageTokens,
          telephone: client.telephone,
          updatedAt: client.createdAt
        }));
        setAuthorizationMetadata(authCode, telephone);
        setIsLoading(false);
      } catch {
        setIsLoading(false);
        localStorage.removeItem(AUTH_CODE_LOCAL_STORAGE_KEY);
        localStorage.removeItem(TELEPHONE_LOCAL_STORAGE_KEY);
        dispatch(setClient(initialStateClientReduxState));
        setAuthorizationMetadata('', '');
        navigate.push('/login');
      }

      return;
    }

    if (!client.id) {
      navigate.push('/login');
      setIsLoading(false);
    };
  };

  useEffect(() => {
    handleLastAccess();
  }, []);

  if (isLoading || !client.id && pathname !== '/login') {
    return <GlobalLoading />;
  }

  return children;
};
