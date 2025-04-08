import dayjs from 'dayjs';
import ZapIcon from '../../../assets/images/chat-logo-social-social-media-whatsapp.svg';
import Image from 'next/image';

interface Message {
    user: string;
    userTelephone: string;
    receivedMessage: string;
    replyMessage: string;
    createdAt: string;
}

interface CardMessageProps {
    message: Message;
}

export const CardMessage = ({ 
  message
}: CardMessageProps) => {
  const stylesDivMessage = 'w-full flex';

  const handleOpenUseZap = () => {
    const link = `https://api.whatsapp.com/send?phone=${message.userTelephone}`;

    window.open(link, '_blank');
  };

  return <div className={`
    relative flex flex-col w-full h-fit border border-primaryLow rounded-md p-4 overflow-hidden
  `}>
    <div className='absolute right-0 top-0 p-2 bg-primaryLow rounded-bl-lg text-[12px]'>
      {dayjs(message.createdAt).format('DD/MM/YYYY HH:mm')}
    </div>
    <Image 
      className='w-6 h-6 absolute right-[110px] top-1 cursor-pointer' 
      src={ZapIcon} alt='zap-icon' 
      onClick={handleOpenUseZap}
    />
    <div className={`${stylesDivMessage} justify-start`}>
      <div className="flex flex-col gap-1.5 w-fit rounded-lg max-w-[50%] max-md:max-w-[100%]">
        <strong>{message.user}</strong>
        <div className='p-2 bg-gray-200 rounded-lg w-fit whitespace-pre-line'>{message.receivedMessage.replace(`${message.user}:`, '')}</div>
      </div>
    </div>
    <div className={`${stylesDivMessage} justify-end`}>
      <div className="flex flex-col gap-1.5 w-fit items-end text-right max-w-[50%] max-md:max-w-[100%]">
        <strong>Resposta da IA</strong>
        <div className='p-2 rounded-lg bg-gray-200 w-fit whitespace-pre-line'>{message.replyMessage}</div>
      </div>
    </div>
  </div>;
};