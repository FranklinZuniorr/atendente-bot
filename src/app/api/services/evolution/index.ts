import axios, { AxiosInstance } from "axios";
import { EvolutionConnectionStateReturn } from "./interfaces";
import { ENUM_EVOLUTION_CONNECTION_STATE } from "./constants";
import { ENVS } from "@/constants";

export class EvolutionService {
    private static httpClient: AxiosInstance = axios.create({
        baseURL: ENVS.evolutionBaseUrl,
        headers: {
            'apiKey': ENVS.evolutionApiKey
        }
    });

    static async getState (instanceName: string): Promise<EvolutionConnectionStateReturn> {
        const path: string = `instance/connectionState/${instanceName}`;

        try {
            const response: EvolutionConnectionStateReturn = (await this.httpClient.get(path)).data;
            return response;
        } catch {
            return {instance: { instanceName, state: ENUM_EVOLUTION_CONNECTION_STATE.NOT_FOUND }};
        }
    }
}