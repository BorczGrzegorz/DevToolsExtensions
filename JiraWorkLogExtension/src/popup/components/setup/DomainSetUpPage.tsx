import * as React from 'react';
import { SetupPage } from './SetupPage';
export interface ServerSetupPage {
  children: React.ReactNode;
}

export const DomainSetUpPage = ({ children }: ServerSetupPage) => {
  return (
    <SetupPage
      placeholder='.jira.domain.com'
      settingsPropertyName={'jiraDomain'}
      text={['I need', 'Jira domain', 'address :)']}>
      {children}
    </SetupPage>
  );
};
