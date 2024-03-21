export interface User {
    id: string;
    name: string;
    email: string;
    email_verified_at: string;
    created_at: string;
}

export interface ShortLink {
    id: number;
    url: string;
    token: string;
    user_id: number;
    created_at: string;
    created_at_format: string;
}

export interface AuthResponse {
    status: string;
    user: User;
    authorisation: {
        token: string;
        refreshToken: string;
    }
}

export interface LinkResponse {
    url: string;
    token: string;
    id: number;
}

export interface AuthResponseError {
    status: string;
    message: string;
}