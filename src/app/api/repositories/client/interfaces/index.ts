export interface Client {
    telephone: string;
    authCode: string;
}

export interface GetClientByTelephoneResponse {
    _id: string;
    telephone: string;
    authCode: string;
    createdAt: string;
    updatedAt: string;
}