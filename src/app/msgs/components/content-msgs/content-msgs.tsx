'use client';

import { useAppSelector } from '@/app/configs/redux/store';
import { invalidateGetMessagesHistory, useGetMessagesHistory } from '../../query-api/get-messages-history';
import { CardMessage } from '../card-message';
import { Alert, Button, Skeleton, Tooltip } from 'antd';
import { HeaderUsers } from '../header-users';
import { useState } from 'react';
import { HeaderUsersElement } from '../header-users/header-users';
import { RedoOutlined } from '@ant-design/icons';

export const ContentMsgs = () => {
  const client = useAppSelector(state => state.client);
  const [selectedUserTelephoneFilter, setSelectedUserTelephoneFilter] = 
  useState<string>('');

  const { 
    data: dataGetMessagesHistory, 
    isFetching: isFetchingGetMessagesHistory,
    isError: isErrorGetMessagesHistory
  } = 
  useGetMessagesHistory(client.id, {
    retry: 1,
    refetchOnWindowFocus: true,
  });

  const normalizedDataGetMessagesHistory = isErrorGetMessagesHistory ? [] : selectedUserTelephoneFilter ? 
    dataGetMessagesHistory?.data.filter(message => message.userTelephone === selectedUserTelephoneFilter) || [] : 
    dataGetMessagesHistory?.data || [];
    
  const reversedMessages = [...normalizedDataGetMessagesHistory].reverse();

  const allUsersMap = new Map<string, HeaderUsersElement>();

  normalizedDataGetMessagesHistory?.forEach(message => {
    const key = `${message.user}-${message.userTelephone}`;
    allUsersMap.set(key, { name: message.user, telephone: message.userTelephone });
  });

  const allUsers = Array.from(allUsersMap.values());

  return <div className="flex flex-col gap-4 w-full shadow-lg p-2 rounded-b-md">
    <HeaderUsers 
      users={[...allUsers]} 
      selectedUserTelephone={selectedUserTelephoneFilter} 
      onChange={user => setSelectedUserTelephoneFilter(user)}
    />
    <div className='flex items-center gap-2'>
      <Tooltip title="Atualizar">
        <Button 
          onClick={() => invalidateGetMessagesHistory()} 
          loading={isFetchingGetMessagesHistory} 
          shape="default" 
          variant='solid'
          color='primary'
          icon={<RedoOutlined />} 
        />
      </Tooltip>
      Total de mensagens: {normalizedDataGetMessagesHistory.length}
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