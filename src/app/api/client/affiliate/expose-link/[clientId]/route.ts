import { connectDB } from '@/app/api/infra/mongoDb';
import { IResponse } from '@/app/api/interfaces';
import { ClientRepository } from '@/app/api/repositories/client';
import ClientModel from '@/app/api/repositories/client/models/client';
import { NextResponse } from 'next/server';
import { AffiliateExposeLinkResponse, AffiliateTokenInfos } from '../../../interfaces';
import { checkClientMiddleware } from '@/app/api/middlewares/check-client/middleware';
import { createToken } from '@/app/api/utils';


const clientRepository = new ClientRepository(ClientModel, connectDB);

export async function GET(req: Request, { params }: { params: Promise<{ clientId: string }> }): Promise<NextResponse<IResponse<AffiliateExposeLinkResponse>>> {
  
  const execute = async () => {
    const clientId = (await params).clientId;
      
    if (!clientId) {
      return NextResponse.json({ message: 'O id do cliente é obrigatório!' }, { status: 400 });
    }

    const clientInDataBase = await clientRepository.getById(clientId);    
    
    if (!clientInDataBase) {
      return NextResponse.json({ message: 'Cliente não encontrado!' }, { status: 400 });
    }

    const { _id, createdAt, telephone, updatedAt } = clientInDataBase;

    const affiliateTokenJwt = createToken<AffiliateTokenInfos>({ _id, createdAt, telephone, updatedAt });

    return NextResponse.json<IResponse<AffiliateExposeLinkResponse>>({ data: { token: affiliateTokenJwt } }, { status: 200 });
  };
    
  return await checkClientMiddleware(req, execute);
}
