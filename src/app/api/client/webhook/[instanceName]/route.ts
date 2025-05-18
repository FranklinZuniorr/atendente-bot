import { IResponse } from '@/app/api/interfaces';
import { checkClientMiddleware } from '@/app/api/middlewares/check-client/middleware';
import { EvolutionService } from '@/app/api/services/evolution';
import { NextResponse } from 'next/server';
import { WebhookGetStatusResponse } from '../../interfaces';

export async function GET(
  req: Request,
  { params }: { params: Promise<{ instanceName: string }> }
): Promise<NextResponse<IResponse<WebhookGetStatusResponse>>> {
  const execute = async () => {
    const instanceName = (await params).instanceName;
  
    if (!instanceName) {
      return NextResponse.json({ message: 'O nome da instância é obrigatório!' }, { status: 400 });
    }
  
    try {
      const response = await EvolutionService.webhookStatus(instanceName as string);
      return NextResponse.json({ data: response }, { status: 200 });
    } catch  {
      return NextResponse.json({ message: 'Não foi possível obter informações sobre o status do chatBot!' }, { status: 404 });
    }
  };

  return await checkClientMiddleware(req, execute);
}
