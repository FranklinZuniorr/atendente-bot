export interface Client {
    telephone: string;
    authCode: string;
    messageTokens?: number;
    affiliateTokenInfosJwt?: string;
}

export interface GetClientRepositoryResponse {
    _id: string;
    telephone: string;
    authCode: string;
    messageTokens?: number; 
    affiliateTokenInfosJwt?: string;
    createdAt: string;
    updatedAt: string;
}