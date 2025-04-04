import RobotIcon from '../assets/images/robot.png';
import { LoginForm } from './components/login-form';

export default function Login() {
  return (
    <div className="bg-gradient-custom h-full flex flex-col items-center justify-center p-1">
      <div className="bg-white p-4 rounded-md max-w-96 w-full flex flex-col gap-5 border-b-[4px] border-b-primary shadow-2xl">
        <header className="w-full flex flex-col">
          <span className='w-full flex justify-center'><img className='w-[3rem] h-[3rem]' src={RobotIcon.src} alt='robot' /></span>
          <h3 className="text-[1.25rem] text-center w-full">Atendente bot</h3>
          <span className="text-[0.8rem] font-normal text-center w-full">Atendimento ágil, inteligente e 24/7 para o seu negócio no WhatsApp! 🚀💬</span>
        </header>
        <LoginForm />
      </div>
    </div>
  );
}
