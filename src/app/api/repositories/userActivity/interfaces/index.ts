export interface UserActivity {
    isEnabled: boolean;
    telephone: string;
    clientId: string;
    name: string;
}

export interface UserActivityRepositoryRepresentational {
    _id: string;
    isEnabled: boolean;
    telephone: string;
    clientId: string;
    name: string;
    createdAt: string;
    updatedAt: string;
}

export interface GetUserActivityWithPaginationResponse {
    totalElements: number;
    activities: UserActivityRepositoryRepresentational[]
}