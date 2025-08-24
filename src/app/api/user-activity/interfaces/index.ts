import { UserActivityRepositoryRepresentational } from '../../repositories/userActivity/interfaces';

export interface GetAllUserActivitiesByClientIdPaginated {
    activities: UserActivityRepositoryRepresentational[];
    total: number;
}