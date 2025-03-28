import { EvolutionService } from "../../services/evolution";
import { ENUM_EVOLUTION_CONNECTION_STATE } from "../../services/evolution/constants";
import { EvolutionInstanceConnectReturn } from "../../services/evolution/interfaces";

export const validadeInstanceStateAndGenerateQrCode = async (
  telephone: string
): Promise<EvolutionInstanceConnectReturn> => {
  const state: ENUM_EVOLUTION_CONNECTION_STATE = (await EvolutionService.getState(telephone)).instance.state;
  console.log(state)

  const tryConnect = async (): Promise<EvolutionInstanceConnectReturn> => {
    try {
      return await EvolutionService.instanceConnect(telephone);
    } catch {
      throw new Error("Não foi possível gerar o qr-code!");
    }
  };

  switch (state) {
    case ENUM_EVOLUTION_CONNECTION_STATE.OPEN:
      throw new Error("Esse telofone já está conectado!");

    case ENUM_EVOLUTION_CONNECTION_STATE.CLOSE:
      return await tryConnect();

    case ENUM_EVOLUTION_CONNECTION_STATE.NOT_FOUND:
      try {
        await EvolutionService.newInstance({
          instanceName: telephone,
          integration: "WHATSAPP-BAILEYS",
          number: telephone,
          qrcode: false,
          token: telephone,
          webhook: {
            events: ["MESSAGES_UPSERT"],
            url: "http://n8n:5678/webhook/message/"
          }
        });
        return await tryConnect();
      } catch {
        throw new Error("Não foi possível gerar o qr-code durante a criação da instância!");
      }

    default:
      throw new Error("Erro inesperado!");
  }
};
