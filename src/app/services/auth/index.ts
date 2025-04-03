import { ReqResponse } from '@/app/interfaces';
import { AuthServiceCheckClientParams, AuthServiceCheckClientResponse, AuthServiceGetQrCodeResponse } from './interfaces';
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

  static async checkClient (params: AuthServiceCheckClientParams): Promise<ReqResponse<AuthServiceCheckClientResponse>> {
    const path: string = 'api/client';

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
}