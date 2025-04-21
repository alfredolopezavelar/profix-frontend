// Interfaces for the app based on db schema

// Authentication 

// Categories of the app
export interface ICategory {
    id: string,
    name: string,
    slug: string,
    coverPhotoURL: string,
    description: string,
    numberProviders: number,
}

// Jobs that a provider could have
export interface IProviderJobs {
    imageURL: string | null,
    title: string,
    description: string,
    date: Date,
}


// Information of a user if it is a provider
export interface IProviderData {
    category: string, //Id of the category that it belongs
    categoryName: string,
    description: string,
    location: string,
    coverPhotoURL: string | null,
    hourlyRate: number | null,
    stars: number, 
    advertiser: boolean,
    balance: number,
    jobs: IProviderJobs[],
}

// Interface of a user
export interface IUser {
    id: string,
    username: string,
    email: string | null,
    name: string,
    profilePhotoURL: string | null,
    isProvider: boolean;
    providerData: IProviderData | null;
}

// Authentication 
export interface IAuthState {
    user: IUser | null,
    isAuthenticated: boolean,
    isLoading: boolean,
    error: string | null,
}


// Necesary information for cards
export interface IShortProvider {
    name: string,
    coverPhotoURL?: string,
    categoryName: string,
    description: string,
    hourlyRate: string,
    stars: number,
    location: string,
}

export interface ISearchFilter {
    query: string,
    category?: string,
    minRating?: number,
    sortBy?: 'price'| 'rating'
}
