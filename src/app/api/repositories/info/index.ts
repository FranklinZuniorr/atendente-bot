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
      const response = await this.infoModel.updateOne({ _id: infoId }, client);

      if (response.modifiedCount === 0) {
        throw new Error('None updated!');
      }
    } catch (error) {
      throw new Error('Info not updated!', { cause: error });
    }
  }

  async delete(infoId: string) {
    try {
      const response = await this.infoModel.deleteOne({ _id: infoId });

      if (response.deletedCount === 0) {
        throw new Error('None deleted!');
      }

    } catch (error) {
      throw new Error('Info not deleted!', { cause: error });
    }
  }

  async getAllByClientId(clientId: string): Promise<InfoRepositoryRepresentation[]> {
    try {
      const response: InfoRepositoryRepresentation[] = await this.infoModel.find({ clientId });

      if (response.length === 0) {
        throw new Error('None info founded!');
      }

      return response;
    } catch (error) {
      throw new Error(`Infos of ${clientId} not founded!`, { cause: error });
    }
  }
}
