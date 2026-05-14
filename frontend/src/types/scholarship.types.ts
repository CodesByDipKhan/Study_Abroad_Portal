export interface Scholarship {
    id: string;
    title: string;
    country: string;
    university: string;
    deadline: string;
    level: 'UG' | 'PG' | 'PhD';
    description: string;
    createdAt: string;
    createdById: string;
}

export interface CreateScholarshipPayload {
    title: string;
    country: string;
    university: string;
    deadline: string;
    level: 'UG' | 'PG' | 'PhD';
    description: string;
}

export interface ScholarshipQuery {
    country?: string;
    level?: 'UG' | 'PG' | 'PhD';
    q?: string;
    page?: number;
    limit?: number;
}

export interface ScholarshipPaginatedResponse {
    data: Scholarship[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}