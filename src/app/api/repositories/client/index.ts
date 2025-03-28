import { IClient } from "./interfaces";
import Client from './models/client';

export class ClientRepository {
  private clientModel: typeof Client;
  private connect: () => Promise<void>;

  constructor(clientModel: typeof Client, connect: () => Promise<void>) {
    this.clientModel = clientModel;
    this.connect = connect;
    this.connect();
  }

  async upsert(client: IClient) {
    try {
      const filter = { telephone: client.telephone };
  
      const options = { upsert: true, new: true };
  
      const updatedClient = await this.clientModel.findOneAndUpdate(filter, client, options);
  
      return updatedClient;
    } catch (error) {
      console.log(error)
      throw new Error("Client not created or updated!", { cause: error });
    }
  }
  
}
