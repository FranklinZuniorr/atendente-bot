'use client';

import { useState } from 'react';
import { Rating } from '../../types';
import { CircleChevronLeft, CircleChevronRight } from 'lucide-react';
import { div as MDiv } from 'motion/react-client';

export const RatingsSlide = () => {
  const RATINGS: Rating[] = [
    {
      username: 'Ana Silva',
      review: 'O atendimento pelo chatbot parece real! Meus clientes se sentem ouvidos de verdade.',
      picture: 'https://randomuser.me/api/portraits/women/85.jpg',
    },
    {
      username: 'João Moura',
      review: 'Mais que um bot… é como ter alguém da equipe sempre online pro cliente.',
      picture: 'https://randomuser.me/api/portraits/men/32.jpg',
    },
    {
      username: 'Carol Fernandes',
      review: 'Achei que seria só mais um robô, mas o chatbot interage de forma tão natural que até elogiaram.',
      picture: 'https://randomuser.me/api/portraits/women/71.jpg',
    },
    {
      username: 'Rafael Oliveira',
      review: 'Vivo, direto e presente. É como se tivesse um atendente real no WhatsApp o tempo todo.',
      picture: 'https://randomuser.me/api/portraits/men/23.jpg',
    },
    {
      username: 'Juliana Costa',
      review: 'Transformou meu atendimento. Sem robôzices, só conversa de verdade com quem chega na loja.',
      picture: 'https://randomuser.me/api/portraits/women/45.jpg',
    },
    {
      username: 'Lucas Santos',
      review: 'É automático, mas parece humano. Meus clientes até perguntam o nome do atendente!',
      picture: 'https://randomuser.me/api/portraits/men/71.jpg',
    },
  ];  

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const currentRating: Rating = RATINGS[currentIndex];
  const MAX_MORE_CLICK = currentIndex === RATINGS.length - 1;
  const MAX_LESS_CLICK = currentIndex === 0;

  const handleSeeMore = () => {
    if (MAX_MORE_CLICK) return;
    setCurrentIndex(prev => prev + 1);
  };

  const handleSeeLess = () => {
    if (MAX_LESS_CLICK) return;
    setCurrentIndex(prev => prev - 1);
  };

  return <div className='w-full flex flex-col gap-4 justify-center items-center'>
    <MDiv 
      key={currentIndex}
      className='flex flex-col gap-4 w-fit max-w-[20rem] items-center text-center rounded-2xl min-h-[170px]'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: 0.4,
        scale: { type: 'spring', visualDuration: 0.4, bounce: 0.5 },
      }}
    >
      <img className='w-[5rem] max-md:w-[4rem] rounded-2xl object-cover' src={currentRating.picture} alt='user' />
      <div className='flex flex-col gap-3 my-3.5'>
        <div className='text-[1.3rem] leading-2'>{currentRating.username}</div>
        <div className='leading-4 break-words'>{currentRating.review}</div>
      </div>
    </MDiv>
    <div className='flex gap-4 p-2 border rounded-2xl items-center border-primary'>
      <div className='cursor-pointer' style={{ opacity: MAX_LESS_CLICK ? 0.5 : 1 }} onClick={handleSeeLess}>
        <CircleChevronLeft className='w-[2rem] h-[2rem] text-primary' />
      </div>
      <div className='w-[5rem] h-[0.3rem] rounded-2xl bg-primary' />
      <div className='cursor-pointer' style={{ opacity: MAX_MORE_CLICK ? 0.5 : 1 }} onClick={handleSeeMore}>
        <CircleChevronRight className='w-[2rem] h-[2rem] text-primary' />
      </div>
    </div>
  </div>;
};