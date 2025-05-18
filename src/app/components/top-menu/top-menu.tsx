'use client';

import { useAppSelector } from '@/app/configs/redux/store';
import RobotIcon from '../../assets/images/robot.png';
import { Button, Tooltip } from 'antd';
import { CheckOutlined, PauseCircleOutlined, PoweroffOutlined, RedoOutlined } from '@ant-design/icons';
import { AuthService } from '@/app/services/auth';
import { useEffect, useState } from 'react';
import { TopMenuOption } from './components/top-menu-option';
import { DollarSign, Info, MessageSquare } from 'lucide-react';
import useScreenWidth from '@/app/hooks/useScreenWidth';

export const TopMenu = () => {
  const client = useAppSelector(state => state.client);
  const [isLoadingFinishConnection, setIsLoadingFinishConnection] = useState<boolean>(false);
  const [isLoadingStopChatBot, setIsLoadingStopChatBot] = useState<boolean>(false);
  const [currentWebhookStatus, setCurrentWebhookStatus] = useState<boolean>(false);
  const [isLoadingGetChatBotStatus, setIsLoadingGetChatBoStatus] = useState<boolean>(false);
  const textTokens = client.messageTokens > 1 ? 'Tokens' : 'Token';

  const screenWidth = useScreenWidth();

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

  const stopChatBot = async () => {
    try {
      setIsLoadingStopChatBot(true);
      await AuthService.stopChatBot(client.telephone, !currentWebhookStatus);
      handleDefineWebhookStatus();
      setIsLoadingStopChatBot(false);
    } catch  {
      setIsLoadingStopChatBot(false);
    }
  };

  const handleDefineWebhookStatus = async () => {
    try {
      setIsLoadingGetChatBoStatus(true);
      const response = await AuthService.getWebhookStatus(client.telephone);
      setIsLoadingGetChatBoStatus(false);
      setCurrentWebhookStatus(response);
    } catch {
      setIsLoadingGetChatBoStatus(false);
      throw new Error('Error on try get webhook info!');
    }
  };

  useEffect(() => {
    handleDefineWebhookStatus();
  }, []);

  return <div className="fixed left-0 top-0 right-0 h-[4rem] bg-gradient-menu z-10 p-2 flex items-center justify-between">
    <div className='flex gap-3 h-fit items-center text-white font-bold ml-2'>
      <img className='w-[2.5rem] h-[2.5rem]' src={RobotIcon.src} alt='robot' />
      <h3>Atendente bot</h3>
    </div>
    <div className='flex items-center mr-2 text-white max-md:flex-col-reverse max-md:items-end min-md:gap-2'>
      <span className='text-[14px] text-end max-md:text-[12px] max-md:mb-[-5px]'>{client.messageTokens || 0} {textTokens}</span>
      <div className='flex items-center gap-2'>
        <Tooltip title="Atualizar página">
          <Button
            onClick={() => window.location.reload()} 
            shape="default" 
            size={screenWidth <= 768 ? 'small' : 'middle'}
            icon={<RedoOutlined />} 
          />
        </Tooltip>
        <Tooltip title={currentWebhookStatus ? 'Parar ChatBot' : 'Iniciar ChatBot'}>
          <Button 
            onClick={stopChatBot} 
            loading={isLoadingStopChatBot || isLoadingGetChatBotStatus} 
            shape="default" 
            size={screenWidth <= 768 ? 'small' : 'middle'}
            icon={currentWebhookStatus ? <PauseCircleOutlined /> : <CheckOutlined />} 
          />
        </Tooltip>
        <Tooltip title="Desconectar">
          <Button 
            onClick={finishConnection} 
            loading={isLoadingFinishConnection} 
            shape="default" 
            size={screenWidth <= 768 ? 'small' : 'middle'}
            icon={<PoweroffOutlined />} 
          />
        </Tooltip>
      </div>
    </div>
    <div className='absolute w-full min-h-[2rem] bg-primaryLow left-0 right-0 top-[4rem] p-1 flex gap-1.5 items-center overflow-x-auto'>
      <TopMenuOption pathname='/' text='Informações' icon={<Info size={14} />} />
      <TopMenuOption pathname='/comprar-tokens' text='Comprar tokens' icon={<DollarSign size={14} />} />
      <TopMenuOption pathname='/msgs' text='Mensagens recebidas' icon={<MessageSquare size={14} />} />
    </div>
  </div>;
};