import { connectDB } from '@/app/api/infra/mongoDb';
import { IResponse } from '@/app/api/interfaces';
import { ClientRepository } from '@/app/api/repositories/client';
import ClientModel from '@/app/api/repositories/client/models/client';
import { NextResponse } from 'next/server';
import { checkClientMiddleware } from '@/app/api/middlewares/check-client/middleware';
import { GetAllAffiliateSellsResponse } from '../../../interfaces';
import { AffiliateRepository } from '../../../../repositories/affiliate';
import AffiliateSellModel from '../../../../repositories/affiliate/models/affiliate';

const clientRepository = new ClientRepository(ClientModel, connectDB);
const affiliateRepository = new AffiliateRepository(AffiliateSellModel, connectDB);

export async function GET(req: Request, { params }: { params: Promise<{ clientId: string }> }): Promise<NextResponse<IResponse<GetAllAffiliateSellsResponse>>> {
  
  const execute = async () => {
    const clientId = (await params).clientId;
      
    if (!clientId) {
      return NextResponse.json({ message: 'O id do cliente é obrigatório!' }, { status: 400 });
    }

    const clientInDataBase = await clientRepository.getById(clientId);    
    
    if (!clientInDataBase) {
      return NextResponse.json({ message: 'Cliente não encontrado!' }, { status: 400 });
    }

    const allSells = await affiliateRepository.getAllSells(clientId);

    return NextResponse.json<IResponse<GetAllAffiliateSellsResponse>>({ data: { sells: allSells } }, { status: 200 });
  };
    
  return await checkClientMiddleware(req, execute);
}
