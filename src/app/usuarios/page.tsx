import { ListUserActivityPaginated } from './components/list-user-activity-paginated';

const Usuarios = () => {
  return <div className='flex flex-col gap-6'>
    <div className="relative text-[1.125rem] pl-3">
        Histórico de clientes que já entraram em contato
      <span className='top-0 w-1 h-full absolute bg-primary left-0' />
    </div>
    <ListUserActivityPaginated />
  </div>;
};

export default Usuarios;