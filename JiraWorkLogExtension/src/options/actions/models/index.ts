import { Action } from 'redux';
import { UserSummary } from './../../models/UserSummary';
import { Settings } from '../../../models/Settings';
import { Notification } from '../../../models/Notifications';

export enum ActionType {
  ChangeSettings,
  LoadUserSummary,
  LogWork,
  DeleteNotifications,
  Error,
}

export interface ErrorAction extends Action<ActionType> {
  type: ActionType.Error;
  payload: Error;
}

export interface ChangeSettingsAction extends Action<ActionType> {
  type: ActionType.ChangeSettings;
  payload: Settings;
}

export interface LoadUserSummaryAction extends Action<ActionType> {
  type: ActionType.LoadUserSummary;
  payload: UserSummary;
}

export interface LogWorkAction extends Action<ActionType> {
  type: ActionType.LogWork;
  payload: {
    issueId: string;
    notification: Notification;
  };
}

export interface DeleteNotificationsAction extends Action<ActionType> {
  type: ActionType.DeleteNotifications;
  payload: Notification[];
}
