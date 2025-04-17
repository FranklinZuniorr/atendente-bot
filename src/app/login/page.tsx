import { Advantages } from './components/advantages';
import { Charges } from './components/charges';
import { HowWork } from './components/how-work';
import { LoginForm } from './components/login-form';
import { PriceInfo } from './components/price-info';

export default function Login() {
  return (
    <div className="w-full">
      <LoginForm />
      <PriceInfo />
      <HowWork />
      <Advantages />
      <Charges />
    </div>
  );
}
