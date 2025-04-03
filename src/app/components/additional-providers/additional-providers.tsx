'use client';

import { COLORS } from '@/constants';
import { ConfigProvider } from 'antd';
import { ReactNode } from 'react';
import { Toaster } from 'react-hot-toast';

interface AdditionalProvidersProps {
    children: ReactNode;
}

export const AdditionalProviders = ({ children }: AdditionalProvidersProps) => {
  return <>
    <Toaster
      position="bottom-center"
      reverseOrder={false}
    />
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