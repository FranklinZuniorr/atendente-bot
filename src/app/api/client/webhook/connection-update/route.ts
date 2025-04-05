import { NextResponse } from 'next/server';
import { WebhookConnectionEventBody } from '../../interfaces';
import { EvolutionService } from '@/app/api/services/evolution';
import { ENUM_EVOLUTION_CONNECTION_STATE } from '@/app/api/services/evolution/constants';
import { EvolutionFetchInstanceElementReturn } from '@/app/api/services/evolution/interfaces';

export async function POST(req: Request) {
  try {
    const body: WebhookConnectionEventBody = await req.json();
    
    if (body.data.state === ENUM_EVOLUTION_CONNECTION_STATE.OPEN) {
      const instances: EvolutionFetchInstanceElementReturn[] = await new Promise((resolve) => setTimeout(() => {
        resolve(EvolutionService.fetchInstance(body.instance));
      }, 2000));
      const instance = instances[0];
      const ownerTelephone = instance.ownerJid.slice(4).replace('@s.whatsapp.net', '');
      const normalizedOwnerTelephone = ownerTelephone.length === 8 ? `55799${ownerTelephone}` : `5579${ownerTelephone}`;

      if (!normalizedOwnerTelephone.startsWith(body.instance)) {
        await EvolutionService.logoutInstance(body.instance);
        await new Promise((resolve) => setTimeout(() => {
          resolve(EvolutionService.deleteInstance(body.instance));
        }, 3000));
        return NextResponse.json({}, { status: 404 });
      }
    }

    return NextResponse.json({}, { status: 200 });
  } catch {
    return NextResponse.json({}, { status: 400 });
  }
}

