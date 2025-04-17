import { Bot, CircleUser, HandCoins, Send } from 'lucide-react';
import { useInView } from 'motion/react';
import { ReactNode, useRef } from 'react';
import { div as MDiv } from 'motion/react-client';

export const FlowRobot = () => {
  const stylesStep = 'flex flex-col items-center bg-white p-[0.5rem] text-primary max-w-[12rem] text-center rounded-[1rem] shadow-md';
  const stylesFlowLine = 'h-[2rem] w-[0.3rem] bg-primaryLow';
  const stylesIcon = 'w-[2rem] h-[2rem]';

  const refElementsContainer = useRef<HTMLDivElement | null>(null);
  const inViewElementsContainer = useInView(refElementsContainer);

  const elements: { node: ReactNode }[] = [
    {
      node: <div className={stylesStep}>
        <CircleUser className={stylesIcon} /> O cliente envia uma mensagem
      </div>
    },
    {
      node: <div className={stylesFlowLine} />
    },
    {
      node: <div className={stylesStep}>
        <Bot className={stylesIcon} /> O robô detecta o recebimento
      </div>
    },
    {
      node: <div className={stylesFlowLine} />
    },
    {
      node: <div className={stylesStep}>
        <Send className={stylesIcon} /> Uma resposta é enviada ao cliente
      </div>
    },
    {
      node: <div className={stylesFlowLine} />
    },
    {
      node: <div className={stylesStep}>
        <HandCoins className={stylesIcon} /> Um token é subtraído da sua conta
      </div>
    }
  ];

  return <div ref={refElementsContainer} className="flex flex-col items-center">
    {
      elements.map((element, index) => (
        <MDiv 
          key={index}
          initial={{ opacity: 0 }}
          animate={inViewElementsContainer ? { opacity: 1 } : false}
          transition={{
            delay: index * 0.1,
            duration: 0.4,
            scale: { type: 'spring', visualDuration: 0.4, bounce: 0.5 },
          }}
        >
          {element.node}
        </MDiv>
      ))
    }
  </div>;
};