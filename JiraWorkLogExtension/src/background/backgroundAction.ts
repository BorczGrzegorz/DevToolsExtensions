import { Notification } from './../models/Notifications';
import { NOTIFICATIONS_KEY } from './../models/Consts';
import { getEngine } from './../engine/index';
import { PushNotification, PushNotificationProps } from './notification';
import { logWork, getUserName, IssueState, SprintState, getIssues } from '../api/devToolsApi';
import { IssueDto } from './../api/devToolsDTO';

const handleNetworkError = async (reason: any, action: BackgrounAction) => {
  let message = 'Something went wrong :(';
  const error = reason as Error;

  if (error) {
    message = error.message;
  }

  const notificationProps: PushNotificationProps = {
    message: message,
    title: 'ERROR',
  };

  const errorNotification: Notification = {
    creationDate: Date.now(),
    logWorkInMinutes: action.logWrkInMinutes,
    issues: action.issues,
    error: reason,
  };

  let notifications: Notification[] = await getEngine().getFromStore(NOTIFICATIONS_KEY);
  if (!notifications) {
    notifications = [];
  }
  getEngine().saveInStore(NOTIFICATIONS_KEY, [...notifications, errorNotification]);
  new PushNotification(notificationProps);
};

export const process = (logWrkInMinutes: number) => {
  console.log('New Task', logWrkInMinutes);
  const action = new BackgrounAction(logWrkInMinutes);
  action.start().catch((reason) => handleNetworkError(reason, action));
};

class BackgrounAction {
  private index: number;
  logWrkInMinutes: number;
  issues: IssueDto[];

  constructor(logWrkInMinutes: number) {
    this.index = 0;
    this.issues = [];
    this.logWrkInMinutes = logWrkInMinutes;
  }

  public start = async () => {
    const userName: string = await getUserName();
    const usersWorlkogs: IssueDto[] = await getIssues({
      issueAssignee: userName,
      notIssueState: [IssueState.COMPLETED, IssueState.REJECTED],
      sprintState: SprintState.ACTIVE,
    });
    this.issues = usersWorlkogs;
    this.createNewNotification();
  };

  private onClickFirstButton = async (source: PushNotification) => {
    try {
      await logWork(this.issues[this.index].id, this.logWrkInMinutes);
    } catch (error) {
      source.dispose();
      handleNetworkError(error, this);
    }
  };

  private onClickSecondButton = (source: PushNotification) => {
    this.index++;
    source.dispose();
    this.createNewNotification();
  };

  private onClickAreaButton = (source: PushNotification) => {
    source.dispose();
  };

  private createNewNotification = (): PushNotification | null => {
    let secondButton = null;
    if (this.issues.length === 0) {
      return null;
    }
    if (this.index < this.issues.length - 1) {
      secondButton = {
        title: 'Next',
        onClick: this.onClickSecondButton,
      };
    }

    const notificationProps: PushNotificationProps = {
      message: this.issues[this.index].summary,
      title: this.issues[this.index].key,
      onAreaClick: this.onClickAreaButton,
      firstButton: {
        title: 'Log',
        onClick: this.onClickFirstButton,
      },
      secondButton: secondButton,
    };

    return new PushNotification(notificationProps);
  };
}
