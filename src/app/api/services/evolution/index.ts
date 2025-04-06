import axios, { AxiosInstance } from 'axios';
import { EvolutionConnectionStateReturn, EvolutionEditWebhookBody, EvolutionFetchInstanceElementReturn, EvolutionInstanceConnectReturn, EvolutionNewInstanceBody, EvolutionNewMessageBody, EvolutionWebhookStatusReturn } from './interfaces';
import { ENUM_EVOLUTION_CONNECTION_STATE } from './constants';
import { ENVS } from '@/constants';

export class EvolutionService {
  private static httpClient: AxiosInstance = axios.create({
    baseURL: ENVS.evolutionBaseUrl,
    headers: {
      'apiKey': ENVS.evolutionApiKey
    }
  });

  static async getState (instanceName: string): Promise<EvolutionConnectionStateReturn> {
    const path: string = `instance/connectionState/${instanceName}`;
    try {
      const response: EvolutionConnectionStateReturn = (await this.httpClient.get(path)).data;
      return response;
    } catch {
      return {instance: { instanceName, state: ENUM_EVOLUTION_CONNECTION_STATE.NOT_FOUND }};
    }
  }

  static async newInstance (params: EvolutionNewInstanceBody) {
    const path: string = 'instance/create';

    try {
      await this.httpClient.post(path, params);
    } catch {
      throw new Error(path);
    }
  }

  static async instanceConnect (instanceName: string): Promise<EvolutionInstanceConnectReturn> {
    const path: string =  `instance/connect/${instanceName}`;

    try {
      const response: EvolutionInstanceConnectReturn = (await this.httpClient.get(path, { params: { number: instanceName } })).data;

      if (!response.code || !response.base64 || !response.pairingCode) {
        throw new Error(`${path}: Evolution codes not generated!`);
      }

      return response;
    } catch {
      throw new Error(path);
    }
  }

  static async sendMessage (instanceName: string, params: EvolutionNewMessageBody) {
    const path: string = `message/sendText/${instanceName}`;

    try {
      await this.httpClient.post(path, params);
    } catch {
      throw new Error(path);
    }
  }

  static async deleteInstance (instanceName: string) {
    const path: string = `instance/delete/${instanceName}`;

    try {
      await this.httpClient.delete(path);
    } catch {
      throw new Error(path);
    }
  }

  static async logoutInstance (instanceName: string) {
    const path: string = `instance/logout/${instanceName}`;

    try {
      await this.httpClient.delete(path);
    } catch {
      throw new Error(path);
    }
  }

  static async fetchInstance (instanceName: string): Promise<EvolutionFetchInstanceElementReturn[]> {
    const path: string = 'instance/fetchInstances';

    try {
      const response: EvolutionFetchInstanceElementReturn[] = (await this.httpClient.get(path, { params: { instanceName } })).data;

      return response;
    } catch {
      throw new Error(path);
    }
  }

  static async changeWebhookStatus (instanceName: string, isActive: boolean) {
    const path: string = `webhook/set/${instanceName}`;

    const body: EvolutionEditWebhookBody = {
      webhook: {
        enabled: isActive,
        events: ['MESSAGES_UPSERT', 'CONNECTION_UPDATE'],
        url: ENVS.webhookSendMessageUrl || ''
      }
    };

    try {
      await this.httpClient.post(path, body);
    } catch {
      throw new Error(path);
    }
  }

  static async webhookStatus (instanceName: string): Promise<EvolutionWebhookStatusReturn> {
    const path: string = `webhook/find/${instanceName}`;

    try {
      const response: EvolutionWebhookStatusReturn = (await this.httpClient.get(path)).data;
      return { enabled: response.enabled };
    } catch {
      throw new Error(path);
    }
  }
}