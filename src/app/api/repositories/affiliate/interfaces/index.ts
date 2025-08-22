

export interface AffiliateSellClient {
    clientId: string;
    name: string;
    telephone: string;
}

export interface AffiliateSell {
    client: AffiliateSellClient
    value: number;
    invoiceId: string;
    affiliateId: string;
    isPaid: boolean;
}

export interface GetAffiliateSellRepositoryResponse {
    _id: string;
    client: AffiliateSellClient
    value: number;
    invoiceId: string;
    affiliateId: string;
    isPaid: boolean;
    createdAt: string;
    updatedAt: string;
}