export interface Client {
    telephone: string;
    authCode: string;
    messageTokens?: number; 
}

export interface GetClientByTelephoneResponse {
    _id: string;
    telephone: string;
    authCode: string;
    messageTokens?: number; 
    createdAt: string;
    updatedAt: string;
}