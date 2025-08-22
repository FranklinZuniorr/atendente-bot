import { LinkArea } from './components/link-area';

const Afiliados = () => {
  return <div className='flex flex-col gap-6'>
    <div className="relative text-[1.125rem] pl-3">
        Seja um afiliado e lucre com a gente
      <span className='top-0 w-1 h-full absolute bg-primary left-0' />
    </div>
    <LinkArea />
    Nenhuma venda realizada!
  </div>;
};

export default Afiliados;