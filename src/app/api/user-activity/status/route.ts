import { NextResponse } from 'next/server';
import { UserActivityRepository } from '../../repositories/userActivity';
import UserActivityModel from '../../repositories/userActivity/models/userActivity';
import { connectDB } from '../../infra/mongoDb';
import { IResponse } from '../../interfaces';
import { checkClientMiddleware } from '../../middlewares/check-client/middleware';

const userActivityRepository = new UserActivityRepository(UserActivityModel, connectDB);

export async function PUT(req: Request): Promise<NextResponse<IResponse>> {
  const execute = async () => {
    try {
      const body = await req.json();
             
      try {
        const { status, id } = body;

        if (status === undefined || status === null) {
          return NextResponse.
            json({ message: 'O status é obrigatório!' }, { status: 400 });
        }

        if (!id) {
          return NextResponse.
            json({ message: 'O id é obrigatório!' }, { status: 400 });
        }
            
        await userActivityRepository.changeStatus(status, id);
      
        return NextResponse.json({ message: 'Atividade atualizada!' }, { status: 200 });
      } catch {
        return NextResponse.json({ message: 'Não foi possível atualizar a disponibilidade desse usuário!' }, { status: 400 });
      }
    } catch {
      return NextResponse.json({ message: 'Nenhum dado encontrado no corpo da requisição!' }, { status: 400 });
    }
      
  };
      
  return await checkClientMiddleware(req, execute);
}
