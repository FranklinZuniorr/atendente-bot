import { NextResponse } from 'next/server';
import { WebhookMessageEventBody } from '../../interfaces';
import { EvolutionService } from '../../../services/evolution';
import { getInfosOfClientByTelephone } from '../../helpers';
import { InfoRepositoryRepresentation } from '../../../repositories/info/interfaces';
import { OpenAIService } from '../../../services/open-ai';
import { OpenAiInput, OpenAiInputContent } from '../../../services/open-ai/interfaces';
import { ClientRepository } from '../../../repositories/client';
import ClientModel from '../../../repositories/client/models/client';
import { connectDB } from '../../../infra/mongoDb';
import { MessageHisotryRepository } from '@/app/api/repositories/message-history';
import MessageHistoryModel from '@/app/api/repositories/message-history/models/message-history';
import { ENUM_OPEN_AI_INPUT_ROLES } from '@/app/api/services/open-ai/constants';

const clientRepository = new ClientRepository(ClientModel, connectDB);
const messageHistoryRepository = new MessageHisotryRepository(MessageHistoryModel, connectDB);

export async function POST(req: Request) {
  try {
    const body: WebhookMessageEventBody = await req.json();
    const client = await clientRepository.getByTelephone(body.instance);

    const userTelephone = body.data.key.remoteJid.replace('@s.whatsapp.net', '');

    if (client.messageTokens === 0) return NextResponse.json({ message: 'O cliente não possui tokens suficientes!' }, { status: 403 });

    if(!body.data.key.fromMe && body.data.key.remoteJid.includes('@s.whatsapp.net') && body.event === 'messages.upsert') {

      const clientInfos: InfoRepositoryRepresentation[] = await getInfosOfClientByTelephone(body.instance);

      if (clientInfos.length === 0) {
        await EvolutionService.
          sendMessage(body.instance, { number: body.data.key.remoteJid.replace('@s.whatsapp.net', ''), text: 'Nenhuma informação disponível!' });
        return NextResponse.json({}, { status: 201 });
      }

      const receivedMessage = `${body.data.pushName}: ${body.data.message.conversation}`;

      let lastGPTMessages: OpenAiInput[] = [];

      try {
        const allMessagesHistoryOfClient = await messageHistoryRepository.getAllByClientId(client._id);
        const userContextGPT = allMessagesHistoryOfClient.filter(message => message.userTelephone === userTelephone) || [];

        lastGPTMessages = userContextGPT.map(message => ({
          role: ENUM_OPEN_AI_INPUT_ROLES.ASSISTANT,
          content: message.replyMessage
        }));
      } catch {
        lastGPTMessages = [];
      }

      const chatGPTInputs: OpenAiInputContent[] = clientInfos.map(info => ({ type: 'input_text', text: `${info.title}: ${info.description}` }));
      const chatGPTResponse = await OpenAIService.getResponse(lastGPTMessages, chatGPTInputs, receivedMessage);

      const replyMessage = chatGPTResponse.output[0].content[0].text;

      await EvolutionService.
        sendMessage(body.instance, { 
          number: userTelephone, 
          text: replyMessage
        });
      await clientRepository.decrementClientTokens(client._id);
      await messageHistoryRepository.create({ 
        clientId: client._id, 
        receivedMessage, 
        replyMessage, 
        user: body.data.pushName,
        userTelephone: userTelephone
      });
      return NextResponse.json({}, { status: 201 });
    }

    return NextResponse.json({}, { status: 400 });
  } catch {
    return NextResponse.json({ message: 'Nenhum dado enviado!' }, { status: 400 });
  }
}

