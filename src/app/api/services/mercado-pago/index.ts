import { ENVS } from '@/constants';
import { MercadoPagoPaymentResponse } from './interfaces';
import axios, { AxiosInstance } from 'axios';

export class MercadoPagoService {
  private static httpClient: AxiosInstance = axios.create({
    baseURL: ENVS.mercadoPagoBaseUrl,
    headers: {
      'Authorization': `Bearer ${ENVS.mercadoPagoAccessToken}`
    }
  });

  static async getPayment(id: string): Promise<MercadoPagoPaymentResponse> {
    const path: string = `v1/payments/${id}`;

    try {
      const response: MercadoPagoPaymentResponse = (await this.httpClient.get(path)).data;
      return response;
    } catch {
      throw new Error(path);
    }
  }
}