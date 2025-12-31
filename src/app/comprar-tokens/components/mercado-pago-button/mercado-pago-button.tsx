'use client';

import React, { useEffect, useState } from 'react';
import { Button, Skeleton } from 'antd';
import { useAppSelector } from '@/configs/redux/store';
import { MinusCircleOutlined, PlusCircleOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { useGetMercadoPagoUrl } from '../../query-api/get-mercado-pago-url';
import { debounce, formatMoney } from 'frutils.js';

export const MercadoPagoButton = () => {
  const client = useAppSelector(state => state.client);
  const defaultTokenQty = 100;
  const defaultPrice = 19.99;
  
  const [itemQty, setItemQty] = useState<number>(1);
  const [itemQtyExhibition, setItemQtyExhibition] = useState<number>(1);
  const [isLoadingOnStart, setIsLoadingOnStart] = useState<boolean>(true);
  
  const tokensQty = itemQtyExhibition * defaultTokenQty;
  const totalPrice = defaultPrice * itemQtyExhibition;

  const { data: url, isFetching } = useGetMercadoPagoUrl({
    clientId: client.id,
    itemQty
  });

  const handleClickBuyButton = () => {
    if(!url) return;

    // @ts-expect-error html script function
    gtag_report_conversion();

    window.open(url);
  };

  const handleDecrementItemQty = () => {
    if(itemQtyExhibition <= 1) return;
    const fn = (prev: number) => prev - 1;
    setItemQtyExhibition(fn);
  };

  const handleIncrementItemQty = () => {
    const fn = (prev: number) => prev + 1;
    setItemQtyExhibition(fn);
  };

  useEffect(() => {
    if(!url) return;
    setIsLoadingOnStart(false);
  }, [url]);

  useEffect(() => {
    debounce(() => setItemQty(itemQtyExhibition), 500);
  }, [itemQtyExhibition]);

  return (
    <>
      {
        isLoadingOnStart ? <Skeleton /> : 
          <div className={`
            flex items-center gap-4 shadow-md p-2.5 min-w-[6.3125rem] min-h-[6.6875rem] 
            max-sm:flex-col max-sm:gap-3 max-md:min-w-[none] max-sm:w-full rounded-md border border-primary
          `}>
            <div className='flex flex-col text-center'>
              <span className="text-primary font-bold text-[22px]">+{tokensQty}</span>
              <div className="text-[18px]">Tokens</div>
            </div>
            <span className='h-full w-[1px] max-sm:w-full max-sm:h-[0.0625rem] bg-primary' />
            <div className='flex flex-col items-center w-full gap-2'>
              <Button 
                className='!bg-primary !text-white !border-0 max-sm:w-full'
                icon={<ShoppingCartOutlined />} 
                loading={isFetching} 
                disabled={isFetching}
                onClick={handleClickBuyButton} 
              > 
                Comprar agora
              </Button>
              <div className='flex gap-2'>
                <MinusCircleOutlined 
                  className='scale-[1.1] cursor-pointer'
                  onClick={handleDecrementItemQty}
                />
                {formatMoney(totalPrice, 'BRL', 'pt-BR', true)}
                <PlusCircleOutlined 
                  className='scale-[1.1] cursor-pointer'
                  onClick={handleIncrementItemQty}
                />
              </div>
            </div>
          </div>
    
      }
    </>
  );
};
