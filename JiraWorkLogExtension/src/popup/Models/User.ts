export interface User {
    key: string;
    name: string;
    avatarSrc: string;
    displayName: string;
}

export interface Users {
    [userName: string]: User
}