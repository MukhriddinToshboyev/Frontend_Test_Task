export interface IAddress {
    address: string;
    city: string;
    state: string;
    country: string;
}

export interface ICompany {
    name: string;
    title: string;
    department: string;
}

export interface IUser {
    id: number;
    firstName: string;
    lastName: string;
    age: number;
    gender: string;
    email: string;
    phone: string;
    username: string;
    image: string;
    role: "admin" | "moderator" | "user";
    address: IAddress;
    company: ICompany;
}

export interface IUsersResponse {
    users: IUser[];
    total: number;
    skip: number;
    limit: number;
}

export interface CreateUserRequest {
    firstName: string;
    lastName: string;
    age: number;
    email?: string;
    phone?: string;
    username?: string;
}

export interface CreateUserResponse extends CreateUserRequest {
    id: number;
}
