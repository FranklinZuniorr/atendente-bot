import { NextResponse } from 'next/server';
import { WebhookMessageEventBody } from '../../interfaces';
import { EvolutionService } from '../../../services/evolution';
import { getInfosOfClientByTelephone } from '../../helpers';
import { InfoRepositoryRepresentation } from '../../../repositories/info/interfaces';
import { OpenAIService } from '../../../services/open-ai';
import { OpenAiInputContent } from '../../../services/open-ai/interfaces';
import { ClientRepository } from '../../../repositories/client';
import ClientModel from '../../../repositories/client/models/client';
import { connectDB } from '../../../infra/mongoDb';
import { MessageHisotryRepository } from '@/app/api/repositories/message-history';
import MessageHistoryModel from '@/app/api/repositories/message-history/models/message-history';

const clientRepository = new ClientRepository(ClientModel, connectDB);
const messageHistoryRepository = new MessageHisotryRepository(MessageHistoryModel, connectDB);

export async function POST(req: Request) {
  try {
    const body: WebhookMessageEventBody = await req.json();
    const client = await clientRepository.getByTelephone(body.instance);

    if (client.messageTokens === 0) return NextResponse.json({ message: 'O cliente não possui tokens suficientes!' }, { status: 403 });

    if(body.data.key.fromMe && body.data.key.remoteJid.includes('@s.whatsapp.net')) {

      const clientInfos: InfoRepositoryRepresentation[] = await getInfosOfClientByTelephone(body.instance);

      if (clientInfos.length === 0) {
        await EvolutionService.
          sendMessage(body.instance, { number: body.data.key.remoteJid.replace('@s.whatsapp.net', ''), text: 'Nenhuma informação disponível!' });
        return NextResponse.json({}, { status: 201 });
      }

      const receivedMessage = body.data.message.conversation;

      const chatGPTInputs: OpenAiInputContent[] = clientInfos.map(info => ({ type: 'input_text', text: `${info.title}: ${info.description}` }));
      const chatGPTResponse = await OpenAIService.getResponse(chatGPTInputs, receivedMessage);

      const replyMessage = chatGPTResponse.output[0].content[0].text;

      await EvolutionService.
        sendMessage(body.instance, { 
          number: body.data.key.remoteJid.replace('@s.whatsapp.net', ''), 
          text: replyMessage
        });
      await clientRepository.decrementClientTokens(client._id);
      await messageHistoryRepository.create({ clientId: client._id, receivedMessage, replyMessage, user: body.data.pushName });
      return NextResponse.json({}, { status: 201 });
    }

    return NextResponse.json({}, { status: 400 });
  } catch {
    return NextResponse.json({ message: 'Nenhum dado enviado!' }, { status: 400 });
  }
}

