import { ENUM_EVOLUTION_CONNECTION_STATE } from '../../services/evolution/constants';

export interface GenerateQrCodeResponse {
    code: string;
    pairingConde: string;
    authCode: string;
}

export interface GetClientResponse {
    _id: string;
    telephone: string;
    authCode: string;
    messageTokens?: number; 
    createdAt: string;
    updatedAt: string;
}

export interface WebhookMessageEventBody {
    event: string;
    instance: string;
    data: {
      key: {
        remoteJid: string;
        fromMe: boolean;
        id: string;
        participant: string;
      };
      pushName: string;
      message: {
        conversation: string;
        messageContextInfo: {
          messageSecret: string;
        };
      };
      messageType: string;
      messageTimestamp: number;
    };
}

export interface WebhookConnectionEventBody {
  event: string,
  instance: string,
  data: { instance: string, state: ENUM_EVOLUTION_CONNECTION_STATE, statusReason: number },
  destination: string,
  date_time: string,
  sender?: string,
  server_url: string,
  apikey: string
}