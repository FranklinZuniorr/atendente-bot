'use client';

import { useAppSelector } from '@/app/configs/redux/store';
import RobotIcon from '../../assets/images/robot.png';
import { Button, Tooltip } from 'antd';
import { PoweroffOutlined } from '@ant-design/icons';
import { AuthService } from '@/app/services/auth';
import { useState } from 'react';

export const TopMenu = () => {
  const client = useAppSelector(state => state.client);
  const [isLoadingFinishConnection, setIsLoadingFinishConnection] = useState<boolean>(false);

  const finishConnection = async () => {
    try {
      setIsLoadingFinishConnection(true);
      await AuthService.finishConnection(client.telephone);
      setIsLoadingFinishConnection(false);

      window.location.reload();
    } catch  {
      setIsLoadingFinishConnection(false);
    }
  };

  return <div className="fixed left-0 top-0 right-0 h-[4rem] bg-gradient-menu z-10 p-2 flex items-center justify-between">
    <div className='flex gap-3 h-fit items-center text-white font-bold ml-2'>
      <img className='w-[2.5rem] h-[2.5rem]' src={RobotIcon.src} alt='robot' />
      <h3>Atendente bot</h3>
    </div>
    <div className='flex items-center mr-2 text-white gap-3'>
        Tokens: {client.messageTokens || 0}
      <Tooltip title="Desconectar">
        <Button onClick={finishConnection} loading={isLoadingFinishConnection} shape="default" icon={<PoweroffOutlined />} />
      </Tooltip>
    </div>
  </div>;
};