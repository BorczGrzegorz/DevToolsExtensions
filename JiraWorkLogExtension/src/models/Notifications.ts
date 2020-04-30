export interface Issue {
  id: string,
  key: string,
  summary: string
}

export interface Notification {
  logWorkInMinutes: number,
  creationDate: number,
  error?: string,
  issues: Issue[]
}