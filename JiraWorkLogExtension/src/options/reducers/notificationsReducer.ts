import { Action } from 'redux';
import { Notification } from './../../models/Notifications';
import { ActionType, LogWorkAction, DeleteNotificationsAction } from '../actions/models';
import _ from 'lodash';

export const notificationsReducer = (previousState: Notification[] = [], action: Action<ActionType>) => {
  switch (action.type) {
    case ActionType.LogWork:
      const logWorkAction = action as LogWorkAction;
      const newState = previousState.filter((x) => x.creationDate !== logWorkAction.payload.notification.creationDate);
      return newState;
    case ActionType.DeleteNotifications:
      const deleteAction = action as DeleteNotificationsAction;
      _.remove(previousState, (n) => _.some(deleteAction.payload, (x) => x.creationDate === n.creationDate));
      return [...previousState];
    default:
      return previousState;
  }
};
