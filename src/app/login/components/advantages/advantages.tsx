'use client';

import { GalleryVerticalEnd, PersonStanding, Rocket, Smile, Sparkles } from 'lucide-react';
import { div as MDiv } from 'motion/react-client';
import { useInView } from 'motion/react';
import { ReactNode, useRef } from 'react';

interface StepInfo {
    title: string;
    icon: ReactNode
}

export const Advantages = () => {
  const refTitle = useRef<HTMLDivElement | null>(null);
  const inViewTitle = useInView(refTitle);

  const refAreaStepsInfos = useRef<HTMLDivElement | null>(null);
  const inViewAreaStepsInfos = useInView(refAreaStepsInfos);

  const stepsInfos: StepInfo[] = [
    {
      title: 'Fácil de usar',
      icon: <Smile className='min-w-[24px]' />
    },
    {
      title: 'A imaginação é o limite, o seu robô pode ser o que você quiser!',
      icon: <Sparkles className='min-w-[24px]' />
    },
    {
      title: 'Respostas 100% humanizadas e convincentes',
      icon: <PersonStanding className='min-w-[24px]' />
    },
    {
      title: 'Contexto total das mensagens anteriores enviadas para o seu zap',
      icon: <GalleryVerticalEnd className='min-w-[24px]' />
    }
  ];

  return <div className="w-full p-14 px-4 flex flex-col gap-8 items-center bg-white rounded-t-[1rem]">
    <MDiv 
      ref={refTitle}
      className="flex gap-2 items-center text-[2.5rem] max-md:text-[2rem] text-primary max-md:flex-col"
      initial={{ opacity: 0, scale: 0 }}
      animate={inViewTitle ? { opacity: 1, scale: 1 } : false}
      transition={{
        duration: 0.4,
        scale: { type: 'spring', visualDuration: 0.4, bounce: 0.5 },
      }}
    >
      <Rocket className='w-[2.5rem] h-[2.5rem] mb-[-4px]' /> VANTAGENS
    </MDiv>
    <div ref={refAreaStepsInfos} className='flex gap-6 flex-wrap justify-center max-md:flex-col w-full'>
      {
        stepsInfos.map((info, index) => (
          <MDiv 
            key={info.title}
            className="bg-white rounded-[0.5rem] p-3 border-b-4 border-primary flex gap-2 items-center w-[20rem] shadow-md max-md:w-full"
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
  </div>;
};