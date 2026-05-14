import { Scholarship } from './scholarship.types';
import { User } from './user.types';
import { Document } from './document.types';

export type ApplicationStatus = 'pending' | 'under_review' | 'accepted' | 'rejected';

export interface Application {
    id: string;
    status: ApplicationStatus;
    appliedAt: string;
    userId: string;
    scholarshipId: string;
    scholarship?: Scholarship;
    user?: User;
    documents?: Document[];
}

export interface CreateApplicationPayload {
    scholarshipId: string;
}

export interface UpdateStatusPayload {
    status: ApplicationStatus;
}

export interface ApplicationPaginatedResponse {
    data: Application[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}