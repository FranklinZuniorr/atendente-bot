'use client';

import { Alert, Button, Skeleton } from 'antd';
import { useAppSelector } from './configs/redux/store';
import { useGetAllInfos } from './query-api/get-all-infos';
import { InfoCard } from './components/info-card';
import { PlusOutlined } from '@ant-design/icons';

export default function Home() {
  const client = useAppSelector(state  => state.client);

  const { data: dataAllInfos, isError: isErrorAllInfos, isFetching: isFetchingAllInfos } = 
  useGetAllInfos(client.id);

  return (
    <div className='w-full flex flex-col gap-4'>
      <header className='relative text-[1.125rem] pl-3'>
        Aqui você pode passar todas as informações necessárias para a nossa IA
        <span className='top-0 w-1 h-full absolute bg-primary left-0' />
      </header>
      {
        isFetchingAllInfos ? <Skeleton /> :
          <div className='max-w-[60rem] flex flex-col gap-[1rem]'>
            <div className='shadow-lg p-2 rounded-md'>
              {
                isErrorAllInfos ?
                  <Alert message="Nenhuma informação encontrada!" type="error" /> :
                  <>
                    {dataAllInfos?.map(elelemt => (
                      <InfoCard 
                        key={elelemt._id} 
                        id={elelemt._id}
                        description={elelemt.description}
                        title={elelemt.title}
                      />
                    ))}
                  </>
              }
            </div>
            <div className='w-full flex justify-end'>
              <Button type="primary" icon={<PlusOutlined />}>Adicionar info</Button>
            </div>
          </div>
      }
    </div>
  );
}
