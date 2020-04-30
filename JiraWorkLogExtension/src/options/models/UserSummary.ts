export interface UserSummary {
    [date: string] : IssueSummary[]
}

export interface IssueSummary {
    issueId: string,
    key: string,
    summary: string,
    timeSpentSeconds: number
}