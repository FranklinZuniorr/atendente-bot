'use client';

import { useAppSelector } from '@/app/configs/redux/store';
import { useGetMessagesHistory } from '../../query-api/get-messages-history';
import { CardMessage } from '../card-message';
import { Alert, Skeleton } from 'antd';

export const ContentMsgs = () => {
  const client = useAppSelector(state => state.client);

  const { 
    data: dataGetMessagesHistory, 
    isFetching: isFetchingGetMessagesHistory,
    isError: isErrorGetMessagesHistory
  } = 
  useGetMessagesHistory(client.id, {
    retry: 2,
    refetchOnWindowFocus: true,
    refetchInterval: 1000 * 20
  });

  return <div className="flex flex-col gap-3 w-full shadow-lg p-2 rounded-b-md">
    <div>
      Total de mensagens: {dataGetMessagesHistory?.data.length || 0}
    </div>
    {
      isFetchingGetMessagesHistory ? <Skeleton /> :
        <>
          {
            isErrorGetMessagesHistory ? 
              <Alert className='max-w-[20rem]' message="Nenhuma mensagem encontrada!" type="error" /> :
              <>
                {
                  dataGetMessagesHistory?.data.reverse().map((message, index) => (
                    <CardMessage key={index} message={message} />
                  ))
                }
              </>
          }
        </>
    }
  </div>;
};