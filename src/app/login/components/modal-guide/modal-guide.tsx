'use client';

import {  Modal } from 'antd';
import { useState } from 'react';

export const ModalGuide = () => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  return <>
    <div 
      className='text-blue-600 underline underline-offset-2 text-center cursor-pointer'
      onClick={() => setIsOpenModal(true)}
    >
        Clique aqui para ver o tutorial
    </div>
    <Modal 
      title="Tutorial de conexão com o WhatsApp" 
      open={isOpenModal} 
      cancelButtonProps={{ hidden: true }}
      onOk={() => setIsOpenModal(false)}
      onCancel={() => setIsOpenModal(false)}
    >
      <video
        className='border-2 border-primaryLow my-4 !shadow-md rounded-[0.5rem] w-[100%] h-[30rem]' 
        controls
        playsInline
        muted
      >
        <source src="guide.mp4" type="video/mp4" />
        Seu navegador não suporta a tag de vídeo.
      </video>
    </Modal>
  </>;
};