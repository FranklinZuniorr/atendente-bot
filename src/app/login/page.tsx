import { LoginForm } from './components/login-form';
import { PriceInfo } from './components/price-info';

export default function Login() {
  return (
    <div className="w-full">
      <LoginForm />
      <PriceInfo />
    </div>
  );
}
