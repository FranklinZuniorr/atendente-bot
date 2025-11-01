'use client';

import RobotIcon from '../../assets/images/robot.png';

export const GlobalLoading = () => {
  return <div className='h-full w-full flex justify-center items-center'>
    <img className='w-[6rem] h-[6rem] animate-upDown' src={RobotIcon.src} alt='robot' />
  </div>;
};