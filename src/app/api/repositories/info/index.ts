import { Info, InfoRepositoryRepresentation } from './interfaces';
import InfoModel from './models/info';

export class InfoRepository {
  private infoModel: typeof InfoModel;
  private connect: () => Promise<void>;

  constructor(infoModel: typeof InfoModel, connect: () => Promise<void>) {
    this.infoModel = infoModel;
    this.connect = connect;
    this.connect();
  }

  async create(client: Info) {
    try {
      await this.infoModel.insertOne(client);
    } catch (error) {
      throw new Error('Info not created!', { cause: error });
    }
  }

  async update(client: Partial<Info>, infoId: string) {
    try {
      await this.infoModel.updateOne({ _id: infoId }, client);
    } catch (error) {
      throw new Error('Info not updated!', { cause: error });
    }
  }

  async getAllByClientId(clientId: string): Promise<InfoRepositoryRepresentation[]> {
    try {
      const response: InfoRepositoryRepresentation[] = await this.infoModel.find({ clientId });

      return response;
    } catch (error) {
      throw new Error(`Infos of ${clientId} not founded!`, { cause: error });
    }
  }
}
