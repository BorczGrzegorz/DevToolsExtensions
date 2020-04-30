import { Action } from "redux";
import { Users } from "../../Models/User";
import { UsersDateWorklog } from "../../Models/UsersDateWorklog";

export enum ActionType {
    LoadUsers,
    LoadUsersWorklogs,
    Error
}

export interface ErrorAction extends Action<ActionType>{
    type: ActionType.Error,
    payload: Error | null
}

export interface LoadUsersAction extends Action<ActionType>{
    payload : Users
    type : ActionType.LoadUsers
}

export interface LoadUsersWorklogsAction extends Action<ActionType>{
    payload: UsersDateWorklog,
    type: ActionType.LoadUsersWorklogs
}