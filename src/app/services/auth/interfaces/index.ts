export interface AuthServiceGetQrCodeResponse {
    code: string,
    pairingConde: string,
    authCode: string
}

export interface AuthServiceCheckClientParams {
    telephone: string;
    authCode: string;
}

export interface AuthServiceCheckClientResponse {
    _id: string,
    telephone: string,
    authCode: string,
    createdAt: string,
    updatedAt: string,
    messageTokens: number
}