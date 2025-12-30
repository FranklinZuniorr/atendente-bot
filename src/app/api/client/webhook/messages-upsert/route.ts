import { NextResponse } from 'next/server';
import { NormalizeUserMessageReturn, WebhookMessageEventBody } from '../../interfaces';
import { EvolutionService } from '../../../services/evolution';
import { getInfosOfClientByTelephone, sendChargeMessageWithPaymentLink, normalizeUserMessage } from '../../helpers';
import { InfoRepositoryRepresentation } from '../../../repositories/info/interfaces';
import { OpenAIService } from '../../../services/open-ai';
import { OpenAiInput, OpenAiInputContent } from '../../../services/open-ai/interfaces';
import { ClientRepository } from '../../../repositories/client';
import ClientModel from '../../../repositories/client/models/client';
import { connectDB } from '../../../infra/mongoDb';
import { MessageHisotryRepository } from '@/app/api/repositories/message-history';
import MessageHistoryModel from '@/app/api/repositories/message-history/models/message-history';
import { ENUM_OPEN_AI_INPUT_CONTENT_TYPES, ENUM_OPEN_AI_INPUT_ROLES } from '@/app/api/services/open-ai/constants';
import { UserActivityRepository } from '@/app/api/repositories/userActivity';
import UserActivityModel from '@/app/api/repositories/userActivity/models/userActivity';
import { UserActivityRepositoryRepresentational } from '@/app/api/repositories/userActivity/interfaces';
import dayjs from 'dayjs';


export async function POST(req: Request) {

  const clientRepository = new ClientRepository(ClientModel, connectDB);
  const messageHistoryRepository = new MessageHisotryRepository(MessageHistoryModel, connectDB);
  const userActivityRepository = new UserActivityRepository(UserActivityModel, connectDB);
  
  try {
    const body: WebhookMessageEventBody = await req.json();
    const client = await clientRepository.getByTelephone(body.instance);

    const regexSufixUniqueDevice = /@s\.whatsapp\.net/i;
    const regexSufixMergeUniqueAndMulti = /(@s\.whatsapp\.net|@lid)/i;

    const userTelephone = 
    regexSufixUniqueDevice.test(body.data.key.remoteJid) ? 
      body.data.key.remoteJid.replace(regexSufixUniqueDevice, '') : 
      body.data.key.remoteJidAlt.replace(regexSufixUniqueDevice, '');

    const isMe = body.data.key.fromMe;
      
    const media = await EvolutionService.getMediaBase64(body.data.key.id, body.instance).then(data => data.base64).catch(() => '');

    const imageCaption = body.data.message?.imageMessage?.caption;

    const isValidUser = !isMe && 
        regexSufixMergeUniqueAndMulti.test(body.data.key.remoteJid) && 
        body.event === 'messages.upsert' &&
        body.data.pushName.length > 0;
    
    const userInfos: UserActivityRepositoryRepresentational | null =
    await userActivityRepository.getByTelephoneAndClientId(userTelephone, client._id).catch(() => null);

    if (userInfos && !userInfos?.isEnabled) {
      const isPausedAfterOneTenMinute = dayjs().isAfter(dayjs(userInfos.updatedAt).add(10, 'minute'));

      if (!isPausedAfterOneTenMinute) {
        return NextResponse.json({ message: 'O usuário está pausado!' }, { status: 403 });
      }

      await userActivityRepository.changeStatus(true, userInfos._id);
    }

    if(
      isValidUser
    ) {
      const userQuestion = body.data.message.conversation || 'Sent a media file!';
      const receivedMessage = `O usuário (${body.data.pushName}), perguntou: ${userQuestion}`;

      if (receivedMessage.match(/undefined/ig)) {
        return NextResponse.json({}, { status: 400 });
      }

      const normalizedUserMessage: NormalizeUserMessageReturn | undefined = 
      await normalizeUserMessage({
        messageType: body.data.messageType,
        receivedMessage,
        imageCaption,
        media
      });

      if(!normalizedUserMessage) {
        return NextResponse.json({}, { status: 400 });
      }

      try {
        await clientRepository.decrementClientTokens(client._id, normalizedUserMessage.tokenDecrementQty);
      } catch {
        await sendChargeMessageWithPaymentLink(body.instance, body.data.key.id, client._id);
        return NextResponse.json({ message: 'O cliente não possui tokens suficientes!' }, { status: 403 });
      }
      
      try {
        await userActivityRepository.create({ 
          clientId: client._id,
          isEnabled: true,
          name: body.data.pushName,
          telephone: userTelephone
        }, client._id);
      } catch {
        return NextResponse.json({ message: 'Não foi possível registrar o usuário!' }, { status: 500 });
      }

      const clientInfos: InfoRepositoryRepresentation[] = await getInfosOfClientByTelephone(body.instance);

      if (clientInfos.length === 0) {
        return NextResponse.json({}, { status: 201 });
      }

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

      const chatGPTInputs: OpenAiInputContent[] = clientInfos.map(info => ({ type: ENUM_OPEN_AI_INPUT_CONTENT_TYPES.TEXT, text: `${info.title}: ${info.description}` }));
      const chatGPTResponse = await OpenAIService.getResponse(lastGPTMessages, chatGPTInputs, normalizedUserMessage.content);

      const replyMessage = chatGPTResponse.output[0].content[0].text;

      await EvolutionService.
        sendMessage(body.instance, { 
          number: userTelephone, 
          text: replyMessage,
          delay: 0,
          quoted: {...body.data }
        });
      await messageHistoryRepository.create({ 
        clientId: client._id, 
        receivedMessage, 
        replyMessage, 
        user: body.data.pushName,
        userTelephone: userTelephone
      });
      return NextResponse.json({}, { status: 201 });
    }

    if (isMe && 
      regexSufixMergeUniqueAndMulti.test(body.data.key.remoteJid) && 
      body.event === 'messages.upsert' &&
      body.data.pushName.length > 0) {
      if (userInfos) {
        await userActivityRepository.changeStatus(false, userInfos._id);
        return NextResponse.json({ 
          message: `As respostas ao usuário ${userInfos.name} foram pausadas após intereção humana!` }, 
        { status: 200 }
        );
      }
    }

    return NextResponse.json({}, { status: 400 });
  } catch {
    return NextResponse.json({ message: 'Nenhum dado enviado!' }, { status: 400 });
  }
}

