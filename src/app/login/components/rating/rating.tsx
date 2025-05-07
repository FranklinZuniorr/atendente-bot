import { Star } from 'lucide-react';
import { div as MDiv } from 'motion/react-client';
import { RatingsSlide } from './components/ratings-slide';

export const Rating = () => {
  return <div className='w-full flex flex-col gap-8 items-center px-4 py-14'>
    <MDiv 
      className="flex gap-2 items-center text-[2.5rem] max-md:text-[2rem] max-md:flex-col text-primary"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.4,
        scale: { type: 'spring', visualDuration: 0.4, bounce: 0.5 },
      }}
    >
      <Star className='w-[2.5rem] h-[2.5rem] mb-[-4px]' /> AVALIAÇÕES
    </MDiv>
    <RatingsSlide />
  </div>;
};