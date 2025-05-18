import { ReqResponse } from '@/app/interfaces';
import { AuthServiceCheckClientParams, AuthServiceCheckClientResponse, AuthServiceGetQrCodeResponse, AuthServiceWebhookStatusResponse } from './interfaces';
import { HttpClientApi } from '@/app/configs/axios';

export class AuthService {
  static async getQrCode (telephone: string): Promise<ReqResponse<AuthServiceGetQrCodeResponse>> {
    const path: string = 'api/client/qr-code';

    try {
      const response = (await HttpClientApi.post(path, { telephone })).data;
      return response;
    } catch {
      throw new Error(path);
            
    }
  }

  static async checkClient (params: AuthServiceCheckClientParams, flag?: boolean): Promise<ReqResponse<AuthServiceCheckClientResponse>> {
    const path: string = flag ? 'api/client/?login-form=login-form' : 'api/client';

    try {
      const response = (await HttpClientApi.get(path, { params })).data;

      return response;
    } catch {
      throw new Error(path);
    }
  }

  static async finishConnection (telephone: string) {
    const path: string = 'api/client';

    try {
      await HttpClientApi.delete(path, { data: { telephone } });
    } catch {
      throw new Error(path);
    }
  }

  static async stopChatBot (instanceName: string, enabled: boolean) {
    const path: string = 'api/client/webhook';

    try {
      await HttpClientApi.post(path, { instanceName, enabled });
    } catch {
      throw new Error(path);
    }
  }

  static async getWebhookStatus (instanceName: string): Promise<boolean> {
    const path: string = `api/client/webhook/${instanceName}`;

    try {
      const response: AuthServiceWebhookStatusResponse = (await HttpClientApi.get(path)).data;
      return response.data.enabled;      
    } catch {
      throw new Error(path);
    }
  }
}