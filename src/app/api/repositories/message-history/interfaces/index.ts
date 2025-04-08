export interface MessageHistory {
    user: string;
    receivedMessage: string;
    replyMessage: string;
    clientId: string;
    userTelephone: string;
}

export interface MessageHistoryRepositoryRepresentation {
    _id: string;
    createdAt: string;
    updatedAt: string;
    user: string;
    receivedMessage: string;
    replyMessage: string;
    userTelephone: string;
    clientId: string;
}