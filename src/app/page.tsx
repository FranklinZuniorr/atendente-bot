'use client';

import { Alert, Button, Skeleton } from 'antd';
import { useAppSelector } from './configs/redux/store';
import { useGetAllInfos } from './query-api/get-all-infos';
import { InfoCard } from './components/info-card';
import { PlusOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { ModalNewInfo } from './components/modal-new-info/modal-new-info';

export default function Home() {
  const client = useAppSelector(state  => state.client);
  const [isOpenModalNewInfo, setIsOpenModalNewInfo] = useState<boolean>(false);
  const stylesSpanTitleEmphasis = 'text-primary';
  const MAX_INFOS_QTY = 50;

  const { data: dataAllInfos, isError: isErrorAllInfos, isFetching: isFetchingAllInfos } = 
  useGetAllInfos(client.id, { retry: 1 });

  const isBlockedAddMoreInfos = (dataAllInfos?.length || 0) >= MAX_INFOS_QTY;

  return (
    <div className='w-full flex flex-col gap-4'>
      <header className='relative text-[1.125rem] pl-3'>
        Aqui você pode passar informações sobre o 
        <span className={stylesSpanTitleEmphasis}> estabelecimento</span>, 
        <span className={stylesSpanTitleEmphasis}> produtos</span>, 
        <span className={stylesSpanTitleEmphasis}> serviços</span> ou o que achar necessário
        <span className='top-0 w-1 h-full absolute bg-primary left-0' />
      </header>
      {
        isFetchingAllInfos ? <Skeleton /> :
          <div className='max-w-[60rem] flex flex-col gap-[1rem]'>
            <div className='shadow-lg p-2 rounded-md flex flex-col gap-4'>
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
              <Button 
                type="primary" 
                onClick={() => setIsOpenModalNewInfo(true)} 
                icon={<PlusOutlined />}
                disabled={isBlockedAddMoreInfos}
              >
              Adicionar info {(dataAllInfos?.length || 0)}/{MAX_INFOS_QTY}
              </Button>
            </div>
          </div>
      }
      <ModalNewInfo isOpen={isOpenModalNewInfo} setIsOpen={setIsOpenModalNewInfo} />
    </div>
  );
}
