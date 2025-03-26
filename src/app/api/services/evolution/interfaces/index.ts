import { ENUM_EVOLUTION_CONNECTION_STATE } from "../constants";

export interface EvolutionConnectionStateReturn {
    instance: {
        instanceName: string;
        state: ENUM_EVOLUTION_CONNECTION_STATE
    }
}