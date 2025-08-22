'use client';

import { useState } from 'react';
import { Rating } from '../../types';
import { CircleChevronLeft, CircleChevronRight } from 'lucide-react';
import { div as MDiv } from 'motion/react-client';
import Image from 'next/image';

export const RatingsSlide = () => {
  const RATINGS: Rating[] = [
    {
      username: 'Ana Silva',
      review: 'O atendimento pelo chatbot parece real! Meus clientes se sentem ouvidos de verdade.',
      picture: 'https://images.unsplash.com/photo-1484863137850-59afcfe05386?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      username: 'João Moura',
      review: 'Mais que um bot… é como ter alguém da equipe sempre online pro cliente.',
      picture: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      username: 'Carol Fernandes',
      review: 'Achei que seria só mais um robô, mas o chatbot interage de forma tão natural que até elogiaram.',
      picture: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      username: 'Rafael Oliveira',
      review: 'Vivo, direto e presente. É como se tivesse um atendente real no WhatsApp o tempo todo.',
      picture: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      username: 'Juliana Costa',
      review: 'Transformou meu atendimento. Sem robôzices, só conversa de verdade com quem chega na loja.',
      picture: 'https://images.unsplash.com/photo-1619895862022-09114b41f16f?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      username: 'Lucas Santos',
      review: 'É automático, mas parece humano. Meus clientes até perguntam o nome do atendente!',
      picture: 'https://plus.unsplash.com/premium_photo-1664199486587-37f325d15182?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
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
      <Image 
        className='!min-w-[5rem] !min-h-[5rem] !max-w-[5rem] !max-h-[5rem] rounded-2xl object-cover' 
        src={currentRating.picture} 
        alt='user' 
        width={80}
        height={80}
      />
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