'use client';

import { useAppSelector } from '@/app/configs/redux/store';
import { COLORS } from '@/constants';
import { ConfigProvider } from 'antd';
import { ReactNode, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { TopMenu } from '../top-menu';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/app/configs/react-query';
import { setClientGlobalStateRedux } from '@/app/helpers';

interface AdditionalProvidersProps {
    children: ReactNode;
}

export const AdditionalProviders = ({ children }: AdditionalProvidersProps) => {
  const client = useAppSelector(state => state.client);

  const handleDefineIntervalAttClient = () => {
    setInterval(() => {
      setClientGlobalStateRedux();
    }, 1000 * 60);
  };


  useEffect(() => {
    handleDefineIntervalAttClient();
  }, []);

  return <>
    <Toaster
      position="bottom-center"
      reverseOrder={false}
    />
    {
      client.id && <TopMenu />
    }
    <div className='pt-[7rem] pr-4 pb-8 pl-4'>
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