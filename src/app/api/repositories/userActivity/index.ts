import { GetUserActivityWithPaginationResponse, UserActivity, UserActivityRepositoryRepresentational } from './interfaces';
import UserActivityModel from './models/userActivity';

export class UserActivityRepository {
  private userActivityModel: typeof UserActivityModel;
  private connect: () => Promise<void>;

  constructor(userActivityModel: typeof UserActivityModel, connect: () => Promise<void>) {
    this.userActivityModel = userActivityModel;
    this.connect = connect;
    this.connect();
  }

  async create(userActivity: UserActivity) {
    try {
      await this.userActivityModel.updateOne(
        { telephone: userActivity.telephone },
        { $set: userActivity },
        { upsert: true }
      );      
    } catch (error) {
      throw new Error('User activity do not created!', { cause: error });
    }
  }

  async changeStatus(status: boolean, id: string) {
    try {
      const response = await this.userActivityModel.updateOne({ _id: id }, { $set: { isEnabled: status } });
  
      if (response.modifiedCount === 0) {
        throw new Error('None updated!');
      }
    } catch (error) {
      throw new Error('User activity status do not updated!', { cause: error });
    }
  }

  async getByTelephone(telephone: string): Promise<UserActivityRepositoryRepresentational> {
    try {
      const response: UserActivityRepositoryRepresentational | null = 
      await this.userActivityModel.findOne({ telephone }).lean<UserActivityRepositoryRepresentational>();

      if (!response) {
        throw new Error('None user activity founded!');
      }

      return response;
    } catch (error) {
      throw new Error('User activity not founded!', { cause: error });
    }
  }

  async getAllByClientId(clientId: string): Promise<UserActivityRepositoryRepresentational[]> {
    try {
      const response: UserActivityRepositoryRepresentational[] = 
      await this.userActivityModel.find({ clientId }).lean<UserActivityRepositoryRepresentational[]>();

      if (response.length === 0) {
        throw new Error('None info founded!');
      }

      return response;
    } catch (error) {
      throw new Error(`User activities of ${clientId} not founded!`, { cause: error });
    }
  }

  async getAllByClientIdWithPagination(
    clientId: string,
    page: number,
    pageSize: number
  ): Promise<GetUserActivityWithPaginationResponse> {
    try {
      const activities = await this.userActivityModel.find({ clientId })
        .skip((page - 1) * pageSize)
        .limit(pageSize)
        .lean<UserActivityRepositoryRepresentational[]>();
  
      const totalElements = await this.userActivityModel.countDocuments({ clientId }) || 0;
  
      return {
        activities,
        totalElements
      };
    } catch (error) {
      throw new Error(`User activities of ${clientId} not found!`, { cause: error });
    }
  }  
}
