import { HttpClientApi } from '@/app/configs/axios';
import { queryClient } from '@/app/configs/react-query';
import { generateReactQuery } from '@/app/helpers/react-query';

export const KEY_GET_MESSAGES_HISTORY = 'KEY_GET_MESSAGES_HISTORY';

interface GetMessagesHistoryReturn {
    data: {
        user: string;
        receivedMessage: string;
        replyMessage: string;
        createdAt: string;
        userTelephone: string;
    }[]
}

export const invalidateGetMessagesHistory = (clientId: string) => {
  if (clientId) {
    queryClient.invalidateQueries({ queryKey: [KEY_GET_MESSAGES_HISTORY, clientId] });
  } else {
    queryClient.invalidateQueries({ queryKey: [KEY_GET_MESSAGES_HISTORY] });
  }
};

const getMessagesHistory = async (clientId: string): Promise<GetMessagesHistoryReturn> => {
  const path: string = `api/client/messages-history/${clientId}`;

  try {
    const response: GetMessagesHistoryReturn = (await HttpClientApi.get(path)).data;

    return response;
  } catch {
    throw new Error(path);
  }
};

export const useGetMessagesHistory = generateReactQuery<GetMessagesHistoryReturn, string>(KEY_GET_MESSAGES_HISTORY, getMessagesHistory);