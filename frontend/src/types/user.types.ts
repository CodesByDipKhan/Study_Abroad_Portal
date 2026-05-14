export interface User {
    id: string;
    name: string;
    email: string;
    role: 'admin' | 'aspirant';
    studyLevel?: 'UG' | 'PG' | 'PhD';
}

export interface LoginPayload {
    email: string;
    password: string;
}

export interface RegisterPayload {
    name: string;
    email: string;
    password: string;
    role?: 'admin' | 'aspirant';
    studyLevel?: 'UG' | 'PG' | 'PhD';
}

export interface AuthResponse {
    access_token: string;
    user: User;
}