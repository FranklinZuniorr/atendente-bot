'use client';

import { useAppSelector } from '@/app/configs/redux/store';
import { useGetMessagesHistory } from '../../query-api/get-messages-history';
import { CardMessage } from '../card-message';
import { Alert, Skeleton } from 'antd';
import { HeaderUsers } from '../header-users';
import { useState } from 'react';

export const ContentMsgs = () => {
  const client = useAppSelector(state => state.client);
  const [selectedUserFilter, setSelectedUserFilter] = useState<string>('');

  const { 
    data: dataGetMessagesHistory, 
    isFetching: isFetchingGetMessagesHistory,
    isError: isErrorGetMessagesHistory
  } = 
  useGetMessagesHistory(client.id, {
    retry: 2,
    refetchOnWindowFocus: true,
    refetchInterval: 1000 * 60
  });

  const normalizedDataGetMessagesHistory = selectedUserFilter ? 
    dataGetMessagesHistory?.data.filter(message => message.user === selectedUserFilter) || [] : 
    dataGetMessagesHistory?.data || [];
  const reversedMessages = [...normalizedDataGetMessagesHistory].reverse();
  const allUsers: Set<string> = new Set(normalizedDataGetMessagesHistory.map(message => message.user));

  return <div className="flex flex-col gap-4 w-full shadow-lg p-2 rounded-b-md">
    <HeaderUsers 
      users={[...allUsers]} 
      selectedUser={selectedUserFilter} 
      onChange={user => setSelectedUserFilter(user)}
    />
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
                  reversedMessages.map((message, index) => (
                    <CardMessage key={index} message={message} />
                  ))
                }
              </>
          }
        </>
    }
  </div>;
};