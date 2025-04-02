import { ENVS } from '@/constants';
import { EvolutionService } from '../../services/evolution';
import { ENUM_EVOLUTION_CONNECTION_STATE } from '../../services/evolution/constants';
import { EvolutionInstanceConnectReturn } from '../../services/evolution/interfaces';
import { InfoRepositoryRepresentation } from '../../repositories/info/interfaces';
import { connectDB } from '../../infra/mongoDb';
import { ClientRepository } from '../../repositories/client';
import ClientModel from '../../repositories/client/models/client';
import { InfoRepository } from '../../repositories/info';
import InfoModel from '../../repositories/info/models/info';
import { GetClientByTelephoneResponse } from '../../repositories/client/interfaces';

export const validadeInstanceStateAndGenerateQrCode = async (
  telephone: string
): Promise<EvolutionInstanceConnectReturn> => {
  const state: ENUM_EVOLUTION_CONNECTION_STATE = (await EvolutionService.getState(telephone)).instance.state;

  const tryConnect = async (): Promise<EvolutionInstanceConnectReturn> => {
    try {
      return await EvolutionService.instanceConnect(telephone);
    } catch {
      throw new Error('Não foi possível gerar o qr-code!');
    }
  };

  switch (state) {
  case ENUM_EVOLUTION_CONNECTION_STATE.OPEN:
    throw new Error('Esse telofone já está conectado!');

  case ENUM_EVOLUTION_CONNECTION_STATE.CLOSE:
    return await tryConnect();

  case ENUM_EVOLUTION_CONNECTION_STATE.NOT_FOUND:
    try {
      await EvolutionService.newInstance({
        instanceName: telephone,
        integration: 'WHATSAPP-BAILEYS',
        number: telephone,
        qrcode: false,
        token: telephone,
        webhook: {
          events: ['MESSAGES_UPSERT'],
          url: ENVS.webhookSendMessageUrl || ''
        }
      });
      return await tryConnect();
    } catch {
      throw new Error('Não foi possível gerar o qr-code durante a criação da instância!');
    }

  default:
    EvolutionService.deleteInstance(telephone);
    throw new Error('Erro inesperado!');
  }
};

export const getInfosOfClientByTelephone = async (telephone: string): Promise<InfoRepositoryRepresentation[]> => {
  const clientRepository = new ClientRepository(ClientModel, connectDB);
  const infoRepository = new InfoRepository(InfoModel, connectDB);
  try {
    const client: GetClientByTelephoneResponse = await clientRepository.getByTelephone(telephone);
    const clientInfos: InfoRepositoryRepresentation[] = await infoRepository.getAllByClientId(client._id);

    return clientInfos;
  } catch  {
    return [];
  }
};