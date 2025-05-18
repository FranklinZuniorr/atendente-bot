import { ContentMsgs } from './components/content-msgs/content-msgs';

const Msgs = () => {
  return <div className="flex flex-col gap-3 w-full">
    <div className="relative text-[1.125rem] pl-3">
        Veja as últimas mensagens respondidas pela IA
      <span className='top-0 w-1 h-full absolute bg-primary left-0' />
    </div>
    <ContentMsgs  />
  </div>;
};

export default Msgs;