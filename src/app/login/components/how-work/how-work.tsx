'use client';

import { Bell, Bot, CircleHelp, MonitorPlay, NotebookPen, Smartphone } from 'lucide-react';
import { div as MDiv } from 'motion/react-client';
import { useInView } from 'motion/react';
import { ReactNode, useRef } from 'react';

interface StepInfo {
    title: string;
    icon: ReactNode
}

export const HowWork = () => {
  const refTitle = useRef<HTMLDivElement | null>(null);
  const inViewTitle = useInView(refTitle);

  const refAreaStepsInfos = useRef<HTMLDivElement | null>(null);
  const inViewAreaStepsInfos = useInView(refAreaStepsInfos);

  const stepsInfos: StepInfo[] = [
    {
      title: 'Insira o seu telefone',
      icon: <Smartphone className='min-w-[24px]' />
    },
    {
      title: 'Alimente o robô com informações sobre o seu estabelecimento, produtos, serviços ou o que achar necessário',
      icon: <NotebookPen className='min-w-[24px]' />
    },
    {
      title: 'Comece a receber mensagens via WhatsApp',
      icon: <Bell className='min-w-[24px]' />
    },
    {
      title: 'As mensagens começam a ser respondidas pelo robô',
      icon: <Bot className='min-w-[24px]' />
    }
  ];

  return <div className="w-full p-8 px-4 flex flex-col gap-4 items-center bg-primary rounded-t-[1rem]">
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
      <CircleHelp className='w-[2.5rem] h-[2.5rem] mb-[-4px]' /> COMO FUNCIONA?
    </MDiv>
    <div ref={refAreaStepsInfos} className='flex flex-col gap-3 max-w-[40rem]'>
      {
        stepsInfos.map((info, index) => (
          <MDiv 
            key={info.title}
            className="bg-white rounded-[0.5rem] p-3 border-l-4 border-primaryLow flex gap-2 items-center"
            initial={{ opacity: 0 }}
            animate={inViewAreaStepsInfos ? { opacity: 1 } : false}
            transition={{
              delay: index * 0.1,
              duration: 0.4,
              scale: { type: 'spring', visualDuration: 0.4, bounce: 0.5 },
            }}
          >
            {info.icon}
            {info.title}
          </MDiv>
        ))
      }
    </div>
    <div className='flex gap-3 items-center mt-4 mb-2 text-[1.5rem] max-md:text-[1rem] text-white max-md:flex-col'>
      <MonitorPlay className='w-[2rem] h-[1.5rem] mb-[-4px]' /> Vídeo de exemplo:
    </div>
    <video
      className='border-2 border-white rounded-[0.5rem]' 
      width="640" 
      height="360" 
      controls
      playsInline
      muted
    >
      <source src="example.webm" type="video/webm" />
      <source src="example.mp4" type="video/mp4" />
        Seu navegador não suporta a tag de vídeo.
    </video>
  </div>;
};