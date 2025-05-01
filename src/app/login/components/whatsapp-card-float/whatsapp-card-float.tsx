import { WhatsAppOutlined } from '@ant-design/icons';

interface WhatsappCardFloatProps {
    onClick: () => void;
}

export const WhatsappCardFloat = ({ onClick }: WhatsappCardFloatProps) => {
  return <div 
    className="flex animate-pulse items-center gap-2 fixed right-4 bottom-4 border border-green-500 pr-4 bg-white min-w-[5rem] h-[3rem] shadow-lg rounded-3xl cursor-pointer"
    onClick={onClick}
  >
    <div className='h-full w-[3rem] rounded-[50%] flex items-center justify-center bg-green-500'>
      <WhatsAppOutlined className='!text-white text-[1.3rem]' />
    </div>
    <div>Abrir WhatsApp</div>
  </div>;
};