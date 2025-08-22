

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
}