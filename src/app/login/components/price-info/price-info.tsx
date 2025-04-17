import Image from 'next/image';
import SmileWoman from '../../../assets/images/mulher-sorridente-apontando-para-voce.png';
import { Receipt } from 'lucide-react';
import * as motion from 'motion/react-client';

export const PriceInfo = () => {
  return <div className="w-full p-6 pt-12 pb-0 h-fit flex flex-col gap-2 items-center text-center">
    <motion.div 
      className="flex gap-2 items-center text-[2.5rem] max-md:text-[2rem] text-primary"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.4,
        scale: { type: 'spring', visualDuration: 0.4, bounce: 0.5 },
      }}
    >
      <Receipt className='w-[2.5rem] h-[2.5rem]' /> SEM MENSALIDADES!
    </motion.div>
    <motion.div 
      className="text-[2rem] max-md:text-[1.5rem] text-primary"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.4,
        delay: 0.2,
        scale: { type: 'spring', visualDuration: 0.4, bounce: 0.5 },
      }}
    >
        Sem compromisso com pagamentos!
    </motion.div>
    <motion.div 
      className="text-[1.7rem] max-md:text-[1.2rem] text-primary"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.4,
        delay: 0.3,
        scale: { type: 'spring', visualDuration: 0.4, bounce: 0.5 },
      }}
    >
        Pague pelo o que usa.
    </motion.div>
    <Image 
      className='w-[20rem] max-md:w-[15rem]'
      src={SmileWoman} 
      alt='mulher-feliz' 
    />
  </div>;
};