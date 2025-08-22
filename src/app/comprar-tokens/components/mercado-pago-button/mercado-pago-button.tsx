'use client';

import React, { useEffect } from 'react';
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';
import { ENVS } from '@/constants';
import { useGetMercadoPagoPreferenceId } from '../../query-api/get-mercado-pago-preference-id';
import { Skeleton } from 'antd';
import { useAppSelector } from '@/app/configs/redux/store';

export const MercadoPagoButton = () => {
  const client = useAppSelector(state => state.client);

  const { data: preferenceId, isFetching } = useGetMercadoPagoPreferenceId(client.id);

  useEffect(() => {
    initMercadoPago(ENVS.mercadoPagoPublicKey || '');
  }, []);

  return (
    <>
      {
        isFetching || !preferenceId ? <Skeleton /> : 
          <div className={`
            flex items-center gap-4 shadow-md p-2.5 min-w-[6.3125rem] min-h-[6.6875rem] 
            max-sm:flex-col max-sm:gap-3 max-md:min-w-[none] max-sm:w-full rounded-md border border-primary
          `}>
            <div className='flex flex-col text-center'>
              <span className="text-primary font-bold text-[22px]">+300</span>
              <div className="text-[18px]">Tokens</div>
            </div>
            <span className='h-full w-[1px] max-sm:w-full max-sm:h-[0.0625rem] bg-primary' />
            <div className="flex flex-col items-center">
              <div style={{ width: '300px' }}>
                <Wallet initialization={{ preferenceId: preferenceId || '' }} />
              </div>
            </div>
          </div>
    
      }
    </>
  );
};