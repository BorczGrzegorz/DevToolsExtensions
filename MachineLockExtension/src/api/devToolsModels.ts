export interface AvatarDto {
    url48x48: string
}

export interface UserDto{
    key: string,
    name: string,
    displayName: string,
    avatarsUrls: AvatarDto
}

export interface UsersDto {
    [userName: string]: UserDto
}

export interface MachineStateDto{
    id: string,
    userName: string,
    lockedDate: Date
}

export interface MachineDto{
    id: string,
    name: string,
}

export interface ProductDto {    
    id: string,
    name: string,
    machines: MachineDto[]
}