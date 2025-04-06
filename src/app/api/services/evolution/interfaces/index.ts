import { ENUM_EVOLUTION_CONNECTION_STATE } from '../constants';

export interface EvolutionConnectionStateReturn {
    instance: {
        instanceName: string;
        state: ENUM_EVOLUTION_CONNECTION_STATE
    }
}

export interface EvolutionNewInstanceBody {
	instanceName: string,
	token: string,
	number: string,
	qrcode: boolean,
	integration: 'WHATSAPP-BAILEYS',
	webhook: {
        byEvents: boolean,
		url: string,
		events: ['MESSAGES_UPSERT', 'CONNECTION_UPDATE']
	}
}

export interface EvolutionInstanceConnectReturn {
    pairingCode: string;
    code: string;
    base64: string;
}

export interface EvolutionNewMessageBody {
    number: string;
    text: string;
}

export interface EvolutionFetchInstanceElementReturn {
    id: string;
    name: string;
    ownerJid: string;
    profileName: string | null;
    profilePicUrl: string | null;
    number: string;
    businessId: string | null;
    token: string;
    clientName: string;
    createdAt: string;
    updatedAt: string;
}

export interface EvolutionEditWebhookBody {
    webhook: {
        enabled: boolean;
        url: string;
        events: ['MESSAGES_UPSERT', 'CONNECTION_UPDATE']
    }
}