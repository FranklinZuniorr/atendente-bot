import { NextResponse } from 'next/server';
import { connectDB } from '../infra/mongoDb';
import { IResponse } from '../interfaces';
import { UserActivityRepository } from '../repositories/userActivity';
import UserActivityModel from '../repositories/userActivity/models/userActivity';
import { GetAllUserActivitiesByClientIdPaginated } from './interfaces';
import { checkClientMiddleware } from '../middlewares/check-client/middleware';

const userActivityRepository = new UserActivityRepository(UserActivityModel, connectDB);

export async function GET(req: Request): Promise<NextResponse<IResponse<GetAllUserActivitiesByClientIdPaginated>>> {
  const execute = async () => {
    try {
      const { url } = req;
      const{ searchParams } = new URL(url);
      const clientId = searchParams.get('clientId');
      const pageSize: number = Number(searchParams.get('pageSize'));
      const page: number = Number(searchParams.get('page'));
  
      if (!clientId) {
        return NextResponse.json({ message: 'Id do cliente é obrigatório!' }, { status: 400 });
      }
  
      if (!pageSize) {
        return NextResponse.json({ message: 'Page size é obrigatória!' }, { status: 400 });
      }
  
      if (!page) {
        return NextResponse.json({ message: 'Page é obrigatória!' }, { status: 400 });
      }
  
      const { activities, totalElements } = await userActivityRepository.getAllByClientIdWithPagination(clientId, page, pageSize);
  
      return NextResponse.json<IResponse<GetAllUserActivitiesByClientIdPaginated>>({ 
        data: { activities, total: totalElements } }, 
      { status: 200 }
      );
          
    } catch {
      return NextResponse.json({ message: 'Não foi possível obter os dados do telefone!' }, { status: 404 });
    }
  };

  return await checkClientMiddleware(req, execute);
}
