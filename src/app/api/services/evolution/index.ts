import axios, { AxiosInstance } from "axios";
import { EvolutionConnectionStateReturn, EvolutionInstanceConnectReturn, EvolutionNewInstanceBody, EvolutionNewMessageBody } from "./interfaces";
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

    static async newInstance (params: EvolutionNewInstanceBody) {
        const path: string = 'instance/create';

        try {
            await this.httpClient.post(path, params);
        } catch {
            throw new Error(path);
        }
    }

    static async instanceConnect (instanceName: string): Promise<EvolutionInstanceConnectReturn> {
        const path: string =  `instance/connect/${instanceName}`;

        try {
            const response: EvolutionInstanceConnectReturn = (await this.httpClient.get(path)).data;
            return response;
        } catch {
            throw new Error(path);
        }
    }

    static async sendMessage (instanceName: string, params: EvolutionNewMessageBody) {
        const path: string = `message/sendText/${instanceName}`;

        try {
            await this.httpClient.post(path, params);
        } catch {
            throw new Error(path);
        }
    }

    static async deleteInstance (instanceName: string) {
        const path: string = `instance/delete/${instanceName}`;

        try {
            await this.httpClient.delete(path);
        } catch {
            throw new Error(path);
        }
    }
}