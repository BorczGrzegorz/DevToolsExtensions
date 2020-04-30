import { Action } from "redux";
import { UserSummary } from './../../models/UserSummary';
import { Settings } from "../../../models/Settings";

export enum ActionType {
    ChangeSettings,
    LoadUserSummary,
    Error
}

export interface ErrorAction extends Action<ActionType>{
    type: ActionType.Error,
    payload: Error
}

export interface ChangeSettingsAction extends Action<ActionType>{
    type: ActionType.ChangeSettings,
    payload: Settings
}

export interface LoadUserSummaryAction extends Action<ActionType>{
    type: ActionType.LoadUserSummary,
    payload: UserSummary
}
