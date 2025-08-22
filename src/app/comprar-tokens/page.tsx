import { HeaderTokensInfo } from './components/header-tokens-info';
import { MercadoPagoButton } from './components/mercado-pago-button';

const BuyTokens = () => {
  return <div className='flex flex-col gap-6'>
    <HeaderTokensInfo />
    <div className='flex flex-wrap gap-2'>
      <MercadoPagoButton />
    </div>
  </div>;
};

export default BuyTokens;