export interface GenerateQrCodeResponse {
    code: string;
    pairingConde: string;
    authCode: string;
}

export interface GetClientResponse {
    _id: string;
    telephone: string;
    authCode: string;
    createdAt: string;
    updatedAt: string;
}