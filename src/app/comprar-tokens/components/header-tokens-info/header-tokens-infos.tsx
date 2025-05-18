'use client';

import { useAppSelector } from '@/app/configs/redux/store';
import { DollarOutlined, RedoOutlined } from '@ant-design/icons';
import { Button } from 'antd';

export const HeaderTokensInfo = () => {
  const client = useAppSelector(state => state.client);
  return <div className='relative flex flex-col gap-1.5 max-w-[30rem] rounded-xl pl-3'>
    <span className='top-0 w-1 h-full absolute bg-primary left-0' />
    <div className='flex gap-2 items-center'>
      <DollarOutlined className='text-[20px]'/>
      <h1 className='text-[1.25rem] flex gap-2'>
        Tokens disponíveis: {client.messageTokens}
        <Button 
          className='min-w-[2rem]'
          variant='outlined' 
          color='primary' 
          icon={<RedoOutlined />} onClick={() => window.location.reload()} 
        />
      </h1>
    </div>
    <span>Os tokens são usados como moeda de troca para cada mensagem que o nosso robô responde por meio do WhatsApp conectado.</span>
  </div>;
};