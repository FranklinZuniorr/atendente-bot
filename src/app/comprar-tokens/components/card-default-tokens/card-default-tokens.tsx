'use client';

import { Button } from 'antd';
import { useGetCheckoutUrl } from '../../query-api/get-checkout-url';
import { useAppSelector } from '@/app/configs/redux/store';
import { MercadoPagoButton } from '../mercado-pago-button';

export const CardDefaultTokens = () => {
  const client = useAppSelector(state => state.client);
  const { data: dataCheckoutUrl, isFetching: isFetchingCheckoutUrl } = 
  useGetCheckoutUrl({ clientId: client.id }, { refetchOnWindowFocus: false });

  const handleOpenUrl = () => {
    const url = dataCheckoutUrl?.data.url;
    if (!url) return;

    window.open(url, '_blank');
  };

  return <div className="flex gap-2 flex-wrap">
    <div className="flex items-center gap-4 shadow-md p-2.5 rounded-md border border-primary">
      <div className='flex flex-col text-center'>
        <span className="text-primary font-bold text-[22px]">+300</span>
        <div className="text-[18px]">Tokens</div>
      </div>
      <span className='h-full w-[1px] bg-primary' />
      <Button 
        variant='solid' 
        color='primary' 
        onClick={handleOpenUrl}
        loading={isFetchingCheckoutUrl}
      >
        Comprar
      </Button>
    </div>
    {
      client.telephone === '5579998529301' &&
      <MercadoPagoButton />
    }
  </div>;
};