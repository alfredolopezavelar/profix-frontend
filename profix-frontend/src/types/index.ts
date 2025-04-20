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

export interface IProvider {
    id: string,
    name: string,
    email?: string,
    profileImgUrl?: string,
    coverImageUrl?: string,
    category: string,
    categoryId: string,
    description: string,
    hourlyRate: string,
    rating: number,
    rewiewsCount: string,
    location: string,
    experience: string,
    works: string[],
}


export interface IShortProvider {
    id: string,
    name: string,
    profileImgUrl?: string,
    category: string,
    description: string,
    hourlyRate: string,
    rating: number,
    location: string,
}