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

  private static iaContext = `Como um atendente feliz da loja, respondo todas as perguntas com base nas informações fornecidas. 
  Se a mensagem não estiver relacionada a esses dados, informarei que não há informações disponíveis. Minhas respostas sempre estarão 
  dentro do escopo de atendimento e das informações disponíveis, sem abordar assuntos fora desse contexto! Pode adicionar emojis nas 
  respostas, deixar bem humanizado.`;

  static async getResponse (infosClient: OpenAiInputContent[], userMessage: string): Promise<OpenAiGetResponseReturn> {
    const path: string = 'v1/responses';
    const body: OpenAiParamsBody = {
      model: 'gpt-4o',
      input: [
        {
          role: ENUM_OPEN_AI_INPUT_ROLES.DEVELOPER,
          content: [{ type: 'input_text', text: this.iaContext }]
        }, 
        { role: ENUM_OPEN_AI_INPUT_ROLES.DEVELOPER, content: infosClient },
        { role: ENUM_OPEN_AI_INPUT_ROLES.USER, content: [{ type: 'input_text', text: userMessage }] }
      ],
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