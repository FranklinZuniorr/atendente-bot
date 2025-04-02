import axios, { AxiosInstance } from 'axios';
import { ENVS } from '@/constants';
import { OpenAiGetResponseReturn, OpenAiInputContent, OpenAiParamsBody } from './interfaces';
import { ENUM_OPEN_AI_INPUT_ROLES } from './constants';

export class OpenAIService {
  private static httpClient: AxiosInstance = axios.create({
    baseURL: ENVS.openAiBaseUrl,
    headers: {
      'Authorization': `Bearer ${ENVS.openAiApiKey}`
    }
  });

  static async getResponse (params: OpenAiInputContent[]): Promise<OpenAiGetResponseReturn> {
    const path: string = 'v1/responses';
    const body: OpenAiParamsBody = {
      model: 'gpt-4o',
      input: [{
        role: ENUM_OPEN_AI_INPUT_ROLES.USER,
        content: params
      }],
      text: {
        format: {
          type: 'text'
        }
      },
      reasoning: {},
      tools: [],
      temperature: 1,
      max_output_tokens: 2048,
      top_p: 1,
      store: true
    };
    try {
      const response: OpenAiGetResponseReturn = (await this.httpClient.post(path, body)).data;
      return response;
    } catch {
      throw new Error(path);
    }
  }
}