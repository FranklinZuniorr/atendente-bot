import { NextResponse } from 'next/server';
import { WebhookChangeStatusBody } from '../interfaces';
import { IResponse } from '../../interfaces';
import { EvolutionService } from '../../services/evolution';

export async function POST(req: Request): Promise<NextResponse<IResponse>> {
  try {
    const body: WebhookChangeStatusBody = await req.json();

    if (!body.instanceName) {
      return NextResponse.json({ message: 'O id da instância é obrigatório!' }, { status: 400 });
    }

    if (body.enabled === undefined) {
      return NextResponse.json({ message: 'O status é obrigatório!' }, { status: 400 });
    }

    await EvolutionService.changeWebhookStatus(body.instanceName, body.enabled);

    const dynamicMessage = body.enabled ? 'ChatBot ativado' : 'ChatBot inativado';

    return NextResponse.json({ message: dynamicMessage }, { status: 200 });

  } catch {
    return NextResponse.json({ message: 'Nenhum dado enviado!' }, { status: 400 });
  }
}

