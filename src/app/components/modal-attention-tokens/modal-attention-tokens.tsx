'use client';

import { useAppSelector } from '@/app/configs/redux/store';
import { WarningOutlined } from '@ant-design/icons';
import { Alert, Modal } from 'antd';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export const ModalAttentionTokens = () => {
  const client = useAppSelector(state => state.client);
  const tokens =  client.messageTokens;
  const [isOpenModal, setIsOpenModal] = useState<boolean>(tokens === 0 ? true : false);
  const navigate = useRouter();

  const handleOk = () => {
    setIsOpenModal(false);
    navigate.push('/comprar-tokens');
  };

  const handleCancel = () => {
    setIsOpenModal(false);
  };

  return <Modal 
    title="Tokens insuficientes!" 
    okText="Comprar tokens"
    cancelText="Ficar sem respostas automáticas"
    cancelButtonProps={{ variant: 'solid', color: 'red' }}
    open={isOpenModal} 
    footer={children => <div className='flex flex-wrap gap-2 justify-end max-md:flex-col-reverse'>{children}</div>}
    onOk={handleOk} 
    onCancel={handleCancel}
  >
    <div className='flex flex-col items-center gap-3 mb-5 mt-4'>
      <WarningOutlined className='text-3xl' />
      <Alert 
        type='error'
        message="Os tokens são usados como moeda de troca para cada mensagem que o nosso robô responde por meio do WhatsApp conectado." 
      />
    </div>
  </Modal>;
};