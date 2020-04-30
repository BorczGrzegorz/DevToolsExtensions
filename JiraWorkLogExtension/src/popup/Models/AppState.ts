import { Users } from "./User";
import { UsersDateWorklog } from "./UsersDateWorklog";

export interface PopupAppState {
    users: Users,
    usersWorklogs: UsersDateWorklog,
    errorMessage: Error | null
}