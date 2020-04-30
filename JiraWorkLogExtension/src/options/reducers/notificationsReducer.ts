import { Action } from 'redux';
import { Notification } from './../../models/Notifications';
import { ActionType } from '../../popup/actions/models';

export const notificationsReducer = (previousState: Notification[] = [], action: Action<ActionType>) => {
  console.log("Notification reducer", previousState);
  return previousState;
}