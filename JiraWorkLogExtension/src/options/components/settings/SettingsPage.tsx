import * as React from 'react';
import { ServerAddressOptions } from './ServerAddressOptions';
import { PushNotificationOptions } from './PushNotificationsOptions';
import { BoardIdOptions } from './BoardIdOptions';
import { JiraDomainOptions } from './JiraDomainOptions';

export const SettingsPage = () => {
  return (
    <>
      <ServerAddressOptions />
      <BoardIdOptions />
      <JiraDomainOptions />
      <PushNotificationOptions />
    </>
  );
};
