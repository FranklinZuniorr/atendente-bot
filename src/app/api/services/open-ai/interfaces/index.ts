import { ENUM_OPEN_AI_INPUT_ROLES } from '../constants';


export interface OpenAiInputContent {
    type: 'input_text',
    text: string,
  }

export interface OpenAiInput {
    role: ENUM_OPEN_AI_INPUT_ROLES,
    content: OpenAiInputContent[]
}

export interface OpenAiParamsBody {
    model: 'gpt-4o-mini',
    input: OpenAiInput[],
    text: {
      format: {
        type: 'text'
      }
    },
    reasoning: object,
    tools: [],
    temperature: 1,
    max_output_tokens: 2048,
    top_p: 1,
    store: true
}

export interface OpenAiGetResponseOutputContent {
    type: string,
    text:  string,
    annotations: Array<unknown>
}

export interface OpenAiGetResponseOutput {
    type: string,
    id: string,
    status: string,
    role: string,
    content: OpenAiGetResponseOutputContent[]
}

export interface OpenAiGetResponseReturn {
    output: OpenAiGetResponseOutput[],
}