import { Advantages } from './components/advantages';
import { Charges } from './components/charges';
import { Footer } from './components/footer';
import { HowWork } from './components/how-work';
import { LoginForm } from './components/login-form';
import { PriceInfo } from './components/price-info';
import { Rating } from './components/rating';
import { TopMenuProspect } from './components/top-menu-prospect';

export default function Login() {
  return (
    <div className="w-full">
      <TopMenuProspect />
      <LoginForm />
      <PriceInfo />
      <HowWork />
      <Advantages />
      <Charges />
      <Rating />
      <Footer />
    </div>
  );
}
