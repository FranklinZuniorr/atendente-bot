'use client';

import { useAppSelector } from '@/app/configs/redux/store';
import { COLORS } from '@/constants';
import { ConfigProvider } from 'antd';
import { ReactNode } from 'react';
import { Toaster } from 'react-hot-toast';
import { TopMenu } from '../top-menu';

interface AdditionalProvidersProps {
    children: ReactNode;
}

export const AdditionalProviders = ({ children }: AdditionalProvidersProps) => {
  const client = useAppSelector(state => state.client);
  return <>
    <Toaster
      position="bottom-center"
      reverseOrder={false}
    />
    {
      client.id && <TopMenu />
    }
    <ConfigProvider
      theme={{
        components: {
          Button: {
            colorPrimary: COLORS.main,
            fontFamily: 'BreeSerif'
          },
        },
      }}
    >
      {children}
    </ConfigProvider>
  </>;
};