import { NextResponse } from 'next/server';
import { IResponse } from '../../../interfaces';
import { checkClientMiddleware } from '@/app/api/middlewares/check-client/middleware';
import { MessageHisotryRepository } from '@/app/api/repositories/message-history';
import MessageHistoryModel from '@/app/api/repositories/message-history/models/message-history';
import { connectDB } from '@/app/api/infra/mongoDb';
import { MessagesHistoryResponse } from '../../interfaces';

const messageHistoryRepository = new MessageHisotryRepository(MessageHistoryModel, connectDB);

export async function GET(req: Request, { params }: { params: Promise<{ clientId: string }> }): Promise<NextResponse<IResponse<MessagesHistoryResponse[]>>> {
  const execute = async () => {
    const clientId = (await params).clientId;
      
    if (!clientId) {
      return NextResponse.json({ message: 'O id do cliente é obrigatório!' }, { status: 400 });
    }
      
    try {
      const response = await messageHistoryRepository.getAllByClientId(clientId);
      return NextResponse.json({ data: response.map(element => ({ 
        user: element.user,
        createdAt: element.createdAt, 
        receivedMessage: element.receivedMessage,
        replyMessage: element.replyMessage,
        userTelephone: element.userTelephone
      })) }, { status: 200 });
    } catch  {
      return NextResponse.json({ message: 'Não foi possível obter o histórico de mensagens!' }, { status: 404 });
    }
  };
    
  return await checkClientMiddleware(req, execute);
}