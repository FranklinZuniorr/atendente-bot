import { ENUM_EVOLUTION_CONNECTION_STATE } from "../constants";

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
		url: '',
		events: [
      'MESSAGES_UPSERT'
  	]
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