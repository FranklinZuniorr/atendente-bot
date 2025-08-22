
export interface AffiliateSellClientExternal { 
    clientId: string;
    name: string;
    telephone: string;
}

export interface AffiliateSellExternal {
    _id: string;
    client: AffiliateSellClientExternal
    value: number;
    invoiceId: string;
    affiliateId: string;
    isPaid: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface AffiliateSellInternal {
    id: string;
    value: number;
    invoiceId: string;
    createdAt: string;
    clientName: string;
    isPaid: boolean;
    clientTelephone: string;
}