export interface User {
    id: number;
    username: string;
    email: string;
    password: string;
    role: Role;
    isConnected: boolean;
}

export enum Role{
    user = 1,
    admin = 2
}