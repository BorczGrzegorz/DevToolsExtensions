export interface UsersDateWorklog {
    [userName: string]: UserDatesWorklog
}

export interface UserDatesWorklog {
    [date: string]: DateWorklog[]
}

export interface DateWorklog {
    issueId : string,
    timeSpentSeconds: number,
    key: string,
    summary: string
}