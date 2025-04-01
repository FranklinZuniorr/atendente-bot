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