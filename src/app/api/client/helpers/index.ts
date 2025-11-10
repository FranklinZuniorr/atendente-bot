import { ENVS } from '@/constants';
import { EvolutionService } from '../../services/evolution';
import { ENUM_EVOLUTION_CONNECTION_STATE } from '../../services/evolution/constants';
import { EvolutionInstanceConnectReturn } from '../../services/evolution/interfaces';
import { InfoRepositoryRepresentation } from '../../repositories/info/interfaces';
import { connectDB } from '../../infra/mongoDb';
import { ClientRepository } from '../../repositories/client';
import ClientModel from '../../repositories/client/models/client';
import { InfoRepository } from '../../repositories/info';
import InfoModel from '../../repositories/info/models/info';
import { GetClientRepositoryResponse } from '../../repositories/client/interfaces';
import { generateMercadoPagoUrl } from '../../payment/helpers';
import { ENUM_MEDIA_TYPES } from '../../constants';
import { OpenAiInputContent } from '../../services/open-ai/interfaces';
import { ENUM_OPEN_AI_INPUT_CONTENT_TYPES } from '../../services/open-ai/constants';
import { NormalizeUserMessageParams, NormalizeUserMessageReturn } from '../interfaces';
import { OpenAIService } from '../../services/open-ai';

export const validadeInstanceStateAndGenerateQrCode = async (
  telephone: string
): Promise<EvolutionInstanceConnectReturn> => {
  const state: ENUM_EVOLUTION_CONNECTION_STATE = (await EvolutionService.getState(telephone)).instance.state;

  const tryConnect = async (): Promise<EvolutionInstanceConnectReturn> => {
    try {
      return await EvolutionService.instanceConnect(telephone);
    } catch {
      throw new Error('Não foi possível gerar o qr-code!');
    }
  };

  switch (state) {
  case ENUM_EVOLUTION_CONNECTION_STATE.CLOSE:
    return await tryConnect();

  case ENUM_EVOLUTION_CONNECTION_STATE.NOT_FOUND:
    try {
      await EvolutionService.newInstance({
        instanceName: telephone,
        integration: 'WHATSAPP-BAILEYS',
        number: telephone,
        qrcode: true,
        token: telephone,
        webhook: {
          byEvents: true,
          events: ['MESSAGES_UPSERT', 'CONNECTION_UPDATE'],
          url: ENVS.webhookNext || ''
        }
      });
      return await tryConnect();
    } catch {
      throw new Error('Não foi possível gerar o qr-code durante a criação da instância!');
    }

  default:
    await EvolutionService.deleteInstance(telephone);
    throw new Error('Erro inesperado!');
  }
};

export const getInfosOfClientByTelephone = async (telephone: string): Promise<InfoRepositoryRepresentation[]> => {
  const clientRepository = new ClientRepository(ClientModel, connectDB);
  const infoRepository = new InfoRepository(InfoModel, connectDB);
  try {
    const client: GetClientRepositoryResponse = await clientRepository.getByTelephone(telephone);
    const clientInfos: InfoRepositoryRepresentation[] = await infoRepository.getAllByClientId(client._id);

    return clientInfos;
  } catch  {
    return [];
  }
};

export const sendChargeMessageWithPaymentLink = async (instanceName: string, anotherMessageId: string, clientId: string) => {
  try {
    const messageText = `
🚨🚨🚨 Seus tokens no Atendente Bot acabaram. 
🚧 Recarregue agora para continuar atendendo seus clientes de forma automática e humanizada!

Comprar +100 tokens: ${(await generateMercadoPagoUrl({ clientId, itemQty: 1 })).url}

Comprar +200 tokens: ${(await generateMercadoPagoUrl({ clientId, itemQty: 2 })).url}

Comprar +300 tokens: ${(await generateMercadoPagoUrl({ clientId, itemQty: 3 })).url}
    `;
    EvolutionService.sendMessage(
      instanceName, 
      { delay: 0, number: instanceName, quoted: { key: { id: anotherMessageId } }, text: messageText  }
    );
  } catch {
    throw new Error('Não foi possível enviar a mensagem de cobrança!');
  }
};

export const normalizeUserMessage = async ({ 
  messageType, 
  receivedMessage, 
  imageCaption, 
  media 
}: NormalizeUserMessageParams): 
  Promise<NormalizeUserMessageReturn | undefined> => {
  switch (messageType) {
  case ENUM_MEDIA_TYPES.IMAGE:
    const image: OpenAiInputContent[] = [
      {
        image_url: `data:image/jpeg+xml;base64,${media}`,
        type: ENUM_OPEN_AI_INPUT_CONTENT_TYPES.IMAGE
      },
      ...(imageCaption ? [{ text: imageCaption, type: ENUM_OPEN_AI_INPUT_CONTENT_TYPES.TEXT }] : [])
    ];

    return { content: image, tokenDecrementQty: 8, type: messageType };
  case ENUM_MEDIA_TYPES.CONVERSATION:
    const conversation: OpenAiInputContent[] = [
      {
        text: receivedMessage,
        type: ENUM_OPEN_AI_INPUT_CONTENT_TYPES.TEXT
      }
    ];
    return { content: conversation, tokenDecrementQty: 1, type: messageType };
  case ENUM_MEDIA_TYPES.AUDIO:
    try {
      const transcription: string = (await OpenAIService.getAudioTranscription(media as string)).text;

      const audio: OpenAiInputContent[] = [
        {
          text: transcription,
          type: ENUM_OPEN_AI_INPUT_CONTENT_TYPES.TEXT
        },
      ];
      return { content: audio, tokenDecrementQty: 8, type: messageType };
    } catch  {
      return undefined;
    }
  default:
    return undefined;
  }
};
