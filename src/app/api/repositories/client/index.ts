import { Client, GetClientRepositoryResponse } from './interfaces';
import ClientModel from './models/client';

export class ClientRepository {
  private clientModel: typeof ClientModel;
  private connect: () => Promise<void>;

  constructor(clientModel: typeof ClientModel, connect: () => Promise<void>) {
    this.clientModel = clientModel;
    this.connect = connect;
    this.connect();
  }

  async upsert(client: Client) {
    try {
      const filter = { telephone: client.telephone };
  
      const options = { upsert: true, new: true };
  
      const updatedClient = await this.clientModel.findOneAndUpdate(filter, client, options);
  
      return updatedClient;
    } catch (error) {
      throw new Error('Client not created or updated!', { cause: error });
    }
  }

  async getByTelephone(telephone: string): Promise<GetClientRepositoryResponse> {
    try {
      const client: GetClientRepositoryResponse | null = await this.clientModel.findOne({ telephone }).lean<GetClientRepositoryResponse>();

      if (!client) throw new Error('Client not found!');

      return client;

    } catch (error) {
      const errorMessage = (error as Error).message;
      throw new Error(errorMessage);
    }
  }

  async getById(id: string): Promise<GetClientRepositoryResponse> {
    try {
      const client: GetClientRepositoryResponse | null = await this.clientModel.findOne({ _id: id }).lean<GetClientRepositoryResponse>();

      if (!client) throw new Error('Client not found!');

      return client;

    } catch (error) {
      const errorMessage = (error as Error).message;
      throw new Error(errorMessage);
    }
  }

  async deleteByTelephone(telephone: string) {
    try {
      const response = await this.clientModel.deleteOne({ telephone });

      if (response.deletedCount === 0) throw new Error('None deleted!');
    } catch {
      throw new Error('It was not possible delete user by db!');
    }
  }
  
  async decrementClientTokens(clientId: string, qty: number) {
    try {
      const updatedClient = await this.clientModel.findOneAndUpdate(
        {
          _id: clientId,
          messageTokens: { $gte: qty }
        },
        { $inc: { messageTokens: -qty } },
        { new: true }
      );

      if (!updatedClient) {
        throw new Error('Client do not have enough tokens!');
      }

      return updatedClient;
    } catch {
      throw new Error('Client token decrement failed!');
    }
  }

  async incrementClientTokens(clientId: string, qty: number) {
    try {
      const response = await this.clientModel.updateOne({ _id: clientId }, { $inc: { messageTokens: qty * 1 }});

      if (response.modifiedCount === 0 ) throw new Error('None updated!');
    } catch {
      throw new Error('It was not possible increment user tokens!');
    }
  }

  async resetClientTokens(clientId: string) {
    try {
      const response = await this.clientModel.updateOne({ _id: clientId }, { $set: { messageTokens: 0 } });

      if (response.modifiedCount === 0 ) throw new Error('None updated!');
    } catch {
      throw new Error('It was not possible increment user tokens!');
    }
  }
}
