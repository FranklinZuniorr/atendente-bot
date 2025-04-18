'use client';

import { useAppSelector } from '@/app/configs/redux/store';
import { COLORS } from '@/constants';
import { ConfigProvider } from 'antd';
import { ReactNode } from 'react';
import { Toaster } from 'react-hot-toast';
import { TopMenu } from '../top-menu';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/app/configs/react-query';
import { ModalAttentionTokens } from '../modal-attention-tokens';
import { usePathname } from 'next/navigation';

interface AdditionalProvidersProps {
    children: ReactNode;
}

export const AdditionalProviders = ({ children }: AdditionalProvidersProps) => {
  const client = useAppSelector(state => state.client);
  const currentPath = usePathname();

  const isInLoginScreen = currentPath === '/login';

  return <>
    <Toaster
      position="bottom-center"
      reverseOrder={false}
    />
    {
      client.id && <>
        <ModalAttentionTokens />
        <TopMenu />
      </>
    }
    <div className={`${client.id && !isInLoginScreen ? 'pt-[7.5rem] pr-4 pb-8 pl-4' : ''}`}>
      <ConfigProvider
        theme={{
          components: {
            Button: {
              colorPrimary: COLORS.main,
              dangerColor: COLORS.red,
              fontFamily: 'BreeSerif',
            },
          },
        }}
      >
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </ConfigProvider>
    </div>
  </>;
};