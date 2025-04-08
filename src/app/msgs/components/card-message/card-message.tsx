import dayjs from 'dayjs';

interface Message {
    user: string;
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
  return <div className={`
    relative flex flex-col w-full h-fit border border-primaryLow rounded-md p-4 overflow-hidden
  `}>
    <div className='absolute right-0 top-0 p-2 bg-primaryLow rounded-bl-lg'>
      {dayjs(message.createdAt).format('DD/MM/YYYY HH:mm')}
    </div>
    <div className={`${stylesDivMessage} justify-start`}>
      <div className="flex flex-col gap-1.5 w-fit rounded-lg max-w-[50%] max-md:max-w-[100%]">
        <strong>{message.user}</strong>
        <div className='p-2 bg-gray-200 rounded-lg w-fit whitespace-pre-line'>{message.receivedMessage}</div>
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