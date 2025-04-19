// Interfaces for the app 

// Authentication 

export interface IUser {
    id: number,
    name: string,
    email: string,
    profileImageUrl: string,
    isProvider: boolean;
    providerId?: number;
}

export interface IAuthState {
    user: IUser | null,
    isAuthenticated: boolean,
    isLoading: boolean,
    error: string | null,
}