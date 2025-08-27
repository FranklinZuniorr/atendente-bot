import axios, { AxiosInstance } from 'axios';
import { ENVS } from '@/constants';
import { OpenAiGetResponseReturn, OpenAiInput, OpenAiInputContent, OpenAiParamsBody } from './interfaces';
import { ENUM_OPEN_AI_INPUT_CONTENT_TYPES, ENUM_OPEN_AI_INPUT_ROLES } from './constants';

export class OpenAIService {
  private static httpClient: AxiosInstance = axios.create({
    baseURL: ENVS.openAiBaseUrl,
    headers: {
      'Authorization': `Bearer ${ENVS.openAiApiKey}`
    }
  });

  static async getResponse (lastAssistantMessages: OpenAiInput[], infosClient: OpenAiInputContent[], userMessage: OpenAiInputContent[]): Promise<OpenAiGetResponseReturn> {
    const iaContext = `Como um atendente feliz da loja, respondo todas as perguntas com base nas informações fornecidas. 
    Se a mensagem não estiver relacionada a esses dados, informarei que não há informações disponíveis. Minhas respostas sempre estarão 
    dentro do escopo de atendimento e das informações disponíveis, sem abordar assuntos fora desse contexto! Pode adicionar emojis nas 
    respostas, deixar bem humanizado. Devo sempre considerar a data a seguir e os seus horários ao criar uma resposta: 
    ${new Intl.DateTimeFormat(
    'pt-BR', 
    { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    })
    .format(new Date()
    )} UTC. Ao receber uma imagem devo detalhar resumidamente o que está aparecendo.`;

    const path: string = 'v1/responses';
    const body: OpenAiParamsBody = {
      model: 'gpt-4o-mini',
      input: [
        {
          role: ENUM_OPEN_AI_INPUT_ROLES.DEVELOPER,
          content: [{ type: ENUM_OPEN_AI_INPUT_CONTENT_TYPES.TEXT, text: iaContext }]
        }, 
        { role: ENUM_OPEN_AI_INPUT_ROLES.DEVELOPER, content: infosClient },
        ...lastAssistantMessages,
        { role: ENUM_OPEN_AI_INPUT_ROLES.USER, content: [...userMessage] },
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