import { Dispatch } from 'redux';
import { getEngine, Engine } from './../../engine/index';
import {
  ChangeSettingsAction,
  ActionType,
  ErrorAction,
  LogWorkAction,
  DeleteNotificationsAction,
} from './models';
import { getUserName, getUsersDateWorklog } from '../../api/devToolsApi';
import { LoadUserSummaryAction } from './models/index';
import { Settings } from '../../models/Settings';
import { SETTINGS_KEY, NOTIFICATIONS_KEY } from '../../models/Consts';
import { Notification } from '../../models/Notifications';
import { logWork as logWorkApi } from '../../api/devToolsApi';
import _ from 'lodash';

export const errorHandler = (error: any) => async (dispatch: Dispatch) => {
  dispatch<ErrorAction>({
    type: ActionType.Error,
    payload: error,
  });
};

export const changeSettings = (settings: Settings) => async (
  dispatch: Dispatch
) => {
  getEngine().saveInStore(SETTINGS_KEY, settings);
  dispatch<ChangeSettingsAction>({
    type: ActionType.ChangeSettings,
    payload: settings,
  });
};

export const loadSummary = () => async (dispatch: Dispatch) => {
  const currentUserName: string = await getUserName();
  const users = await getUsersDateWorklog({ userName: [currentUserName] });
  dispatch<LoadUserSummaryAction>({
    type: ActionType.LoadUserSummary,
    payload: users[Object.keys(users)[0]],
  });
};

export const deleteNotifications = (notifications: Notification[]) => async (
  dispatch: Dispatch
) => {
  await deleteNotificationsFromStore(notifications);
  dispatch<DeleteNotificationsAction>({
    type: ActionType.DeleteNotifications,
    payload: notifications,
  });
};

export const logWork = (notification: Notification, issueId: string) => async (
  dispatch: Dispatch
) => {
  //await logWorkApi(issueId, notification.logWorkInMinutes);
  await deleteNotificationsFromStore([notification]);
  dispatch<LogWorkAction>({
    type: ActionType.LogWork,
    payload: {
      notification,
      issueId,
    },
  });
};

const deleteNotificationsFromStore = async (
  notifications: Notification[]
): Promise<void> => {
  const engine: Engine = getEngine();
  let notificationsFromStore: Notification[] = await engine.getFromStore(
    NOTIFICATIONS_KEY
  );

  notificationsFromStore = _.remove(notificationsFromStore, (n) =>
    _.some(notifications, (x) => x.creationDate === n.creationDate)
  );

  engine.saveInStore(NOTIFICATIONS_KEY, notificationsFromStore);
};
