export interface StripeCheckoutResponse {
    url: string;
}

export interface StripeCheckoutParams {
    clientId: string;
    qty: number;
}