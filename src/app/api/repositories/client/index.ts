import { Client, GetClientByTelephoneResponse } from "./interfaces";
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
      throw new Error("Client not created or updated!", { cause: error });
    }
  }

  async getByTelephone(telephone: string): Promise<GetClientByTelephoneResponse> {
    try {
      const client: GetClientByTelephoneResponse | null = await this.clientModel.findOne({ telephone });

      if (!client) throw new Error("Client not found!")

      return client;

    } catch (error) {
      const errorMessage = (error as Error).message;
      throw new Error(errorMessage);
    }
  }
  
}
