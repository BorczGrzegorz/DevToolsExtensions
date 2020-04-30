export interface Settings {
  isPushNotificationEnabled: boolean;
  delayInMinutes: number;
  serverAddress: string;
  boardId: string;
  jiraDomain: string;
}

export const DefaultSettings: Settings = {
  isPushNotificationEnabled: true,
  delayInMinutes: 15,
  serverAddress: '',
  boardId: '',
  jiraDomain: '',
};
