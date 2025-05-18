import RobotIcon from '../../../assets/images/robot.png';

export const Footer = () => {

  const currentYear = new Date().getFullYear();

  return <div className="bg-gradient-custom p-4 border-t-[0.3rem] border-white">
    <div className="w-fit">
      <div className='flex gap-3 h-fit items-center text-white font-bold ml-2'>
        <img className='w-[4rem] h-[4rem] max-md:w-[2.5rem] max-md:h-[2.5rem]' src={RobotIcon.src} alt='robot' />
        <div className='flex flex-col'>
          <span className='text-[1.2rem] max-md:text-[1rem]'>Atendente bot</span>
          <span className='text-[0.8rem] max-md:text-[0.6rem]'>© {currentYear} Atendente-bot. Todos os direitos reservados.</span>
        </div>
      </div>
    </div>
  </div>;
};