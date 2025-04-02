import { NextResponse } from 'next/server';
import { connectDB } from '../../infra/mongoDb';
import { IResponse } from '../../interfaces';
import InfoModel from '../../repositories/info/models/info';
import { InfoRepository } from '../../repositories/info';
import { InfoRepositoryRepresentation } from '../../repositories/info/interfaces';
import { checkClientMiddleware } from '../../middlewares/check-client/middleware';

const infoRepository = new InfoRepository(InfoModel, connectDB);

export async function GET(req: Request): Promise<NextResponse<IResponse<InfoRepositoryRepresentation[]>>> {
  const execute = async () => {
    try {
      const { url } = req;
      const{ searchParams } = new URL(url);
      const clientId = searchParams.get('clientId');
                 
      if (!clientId) {
        return NextResponse.json({ message: 'O id do cliente é orbigatório!' }, { status: 400 });
      }

      const clients: InfoRepositoryRepresentation[] = await infoRepository.getAllByClientId(clientId);

      return NextResponse.json({ data: clients }, { status: 200 });

    } catch {
      return NextResponse.json({ message: 'Nenhuma informação encontrada!' }, { status: 400 });
    }
  };
          
  return await checkClientMiddleware<InfoRepositoryRepresentation[]>(req, execute);
}
