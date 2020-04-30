export interface UserDto {
    key: string,
    name: string,
    emailAddress: string,
    displayName: string,
    avatarsUrls: AvatarDto
}

export interface AvatarDto {
    url48x48: string,
    url24x24: string,
    url16x16: string,
    url32x32: string
}

export interface IssueDto {
    id: string,
    key: string,
    summary: string
}

export interface UsersDto {
    [userName: string]: UserDto
}

export interface UsersDateWorklogDto {
    [userName: string]: UserDatesWorklogDto
}

export interface UserDatesWorklogDto {
    [date: string]: DateWorklogDto[]
}

export interface DateWorklogDto {
    issueId : string,
    timeSpentSeconds: number,
    key: string,
    summary: string
}
