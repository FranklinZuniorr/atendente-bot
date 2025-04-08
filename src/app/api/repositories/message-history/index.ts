import { MessageHistory, MessageHistoryRepositoryRepresentation } from './interfaces';
import MessageHistoryModel from './models/message-history';

export class MessageHisotryRepository {
  private messageHistoryModel: typeof MessageHistoryModel;
  private connect: () => Promise<void>;

  constructor(messageHistoryModel: typeof MessageHistoryModel, connect: () => Promise<void>) {
    this.messageHistoryModel = messageHistoryModel;
    this.connect = connect;
    this.connect();
  }

  async create(messageHistory: MessageHistory) {
    try {
      await this.messageHistoryModel.insertOne(messageHistory);
    } catch (error) {
      throw new Error('Message history not created!', { cause: error });
    }
  }

  async getAllByClientId(clientId: string): Promise<MessageHistoryRepositoryRepresentation[]> {
    try {
      const response: MessageHistoryRepositoryRepresentation[] = await this.messageHistoryModel.find({ clientId });

      if (response.length === 0) {
        throw new Error('None message history founded!');   
      }

      return response;
    } catch {
      throw new Error('It was not possible find some message history!');
    }
  }
}
