'use client';

import { useAppSelector } from '@/app/configs/redux/store';
import { usePathname, useRouter } from 'next/navigation';
import { ReactNode, useEffect } from 'react';

interface AuthMiddlewareProps {
  children: ReactNode;
}

export const AuthMiddleware = ({ children }: AuthMiddlewareProps) => {
  const navigate = useRouter();
  const pathname = usePathname();
  const client = useAppSelector((state) => state.client);

  useEffect(() => {
    if (!client) {
      navigate.push('/login');
    }
  }, [client, navigate]);

  if (!client && pathname !== '/login') {
    return <div>Carregando...</div>;
  }

  return children;
};
