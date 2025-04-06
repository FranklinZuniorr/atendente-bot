import { EvolutionService } from '@/app/api/services/evolution';
import { NextApiRequest } from 'next';
import { NextResponse } from 'next/server';

export async function GET(
  _: NextApiRequest,
  context: { params: { instanceName: string } }
) {
  const { instanceName } = await context.params;

  if (!instanceName) {
    return NextResponse.json({ message: 'O nome da instância é obrigatório!' }, { status: 400 });
  }

  try {
    const response = await EvolutionService.webhookStatus(instanceName as string);
    return NextResponse.json({ data: response }, { status: 200 });
  } catch  {
    return NextResponse.json({ message: 'Não foi possível obter informações sobre o status do chatBot!' }, { status: 404 });
  }
}
