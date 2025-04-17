'use client';

import { ReceiptText } from 'lucide-react';
import { div as MDiv } from 'motion/react-client';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import { FlowRobot } from './components/flow-robot';

export const Charges = () => {
  const refTitle = useRef<HTMLDivElement | null>(null);
  const inViewTitle = useInView(refTitle);

  const refSubTitle = useRef<HTMLDivElement | null>(null);
  const inViewSubTitle = useInView(refSubTitle);

  const textSubTitle = `
  Utilizamos um sistema de cobrança baseado na quantidade de tokens disponíveis: a cada mensagem respondida pelo robô, um token é descontado. 
  Você não precisa se preocupar com mensalidades recorrentes ou ficar 
  preso ao nosso sistema — basta adquirir novos tokens sempre que quiser e utilizá-los com total liberdade, no seu ritmo.
  `;

  return <div className="w-full p-8 px-4 flex flex-col gap-4 items-center bg-primary">
    <MDiv 
      ref={refTitle}
      className="flex gap-2 items-center text-[2.5rem] max-md:text-[2rem] text-white max-md:flex-col"
      initial={{ opacity: 0, scale: 0 }}
      animate={inViewTitle ? { opacity: 1, scale: 1 } : false}
      transition={{
        duration: 0.4,
        scale: { type: 'spring', visualDuration: 0.4, bounce: 0.5 },
      }}
    >
      <ReceiptText className='w-[2.5rem] h-[2.5rem] mb-[-4px]' /> COBRANÇAS
    </MDiv>
    <MDiv 
      ref={refSubTitle}
      className="text-[1.2rem] max-md:text-[1rem] text-white text-center max-w-[65rem] mb-[2rem]"
      initial={{ opacity: 0, scale: 0 }}
      animate={inViewSubTitle ? { opacity: 1, scale: 1 } : false}
      transition={{
        duration: 0.4,
        scale: { type: 'spring', visualDuration: 0.4, bounce: 0.5 },
      }}
    >
      {textSubTitle}
    </MDiv>
    <FlowRobot />
  </div>;
};