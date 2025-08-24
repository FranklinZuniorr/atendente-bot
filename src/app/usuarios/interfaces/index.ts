export interface UserActivityExternal {
    _id: string;
    isEnabled: boolean;
    telephone: string;
    clientId: string;
    name: string;
    createdAt: string;
    updatedAt: string;
}

export interface UserActivityInternal {
    _id: string;
    isEnabled: boolean;
    telephone: string;
    name: string;
    createdAt: string;
}
