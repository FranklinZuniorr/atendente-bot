'use client';

import useCurrentScroll from '@/app/hooks/useCurrentScroll';
import RobotIcon from '../../../assets/images/robot.png';
import { Button } from 'antd';
import { AnimatePresence } from 'motion/react';
import { div as MDiv } from 'motion/react-client';

export const TopMenuProspect = () => {
  const currentScrollY = useCurrentScroll();
  const isShowingTopBar = currentScrollY > 100;

  const handleOnClikcBtnStartSell = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return <AnimatePresence>
    {
      isShowingTopBar && 
        <MDiv 
          className='flex justify-between items-center fixed left-0 top-0 right-0 bg-white p-3 z-10 shadow-md border-b-2 border-primary'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className='flex gap-3 h-fit items-center text-primary font-bold ml-2'>
            <img className='w-[2.5rem] h-[2.5rem]' src={RobotIcon.src} alt='robot' />
            <h3>Atendente bot</h3>
          </div>
          <div className='flex gap-2.5 items-center'>
            <span className='text-right max-md:hidden'>Comece a vender mais agora mesmo!</span>
            <Button 
              type="primary" 
              color='primary'
              onClick={handleOnClikcBtnStartSell}
            >
              Começar agora
            </Button>
          </div>
        </MDiv>
    }
  </AnimatePresence>;
};