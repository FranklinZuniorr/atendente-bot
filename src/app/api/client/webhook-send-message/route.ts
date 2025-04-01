import { NextResponse } from 'next/server';
import { WebhookMessageEventBody } from '../interfaces';
import { EvolutionService } from '../../services/evolution';

export async function POST(req: Request) {
  try {
    const body: WebhookMessageEventBody = await req.json();

    if(body.data.key.fromMe && body.data.key.remoteJid.includes('@s.whatsapp.net')) {
      await EvolutionService.sendMessage(body.instance, { number: body.data.key.remoteJid.replace('@s.whatsapp.net', ''), text: 'teste chatbot' });
      return NextResponse.json({}, { status: 201 });
    }

    return NextResponse.json({}, { status: 400 });
  } catch {
    return NextResponse.json({ message: 'Nenhum dado enviado!' }, { status: 400 });
  }
}

