import * as React from 'react';
import { SetupPage } from './SetupPage';

export interface ServerSetupPage {
  children: React.ReactNode;
}

export const ServerSetupPage = ({ children }: ServerSetupPage) => {
  return (
    <SetupPage text={['Please', 'Set server address']} settingsPropertyName={'serverAddress'}>
      {children}
    </SetupPage>
  );
};
