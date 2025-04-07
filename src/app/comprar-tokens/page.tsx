import { CardDefaultTokens } from './components/card-default-tokens';
import { HeaderTokensInfo } from './components/header-tokens-info';

const BuyTokens = () => {
  return <div className='flex flex-col gap-6'>
    <HeaderTokensInfo />
    <div className='flex flex-wrap gap-2'>
      <CardDefaultTokens />
    </div>
  </div>;
};

export default BuyTokens;