import * as React from 'react';
import { SettingsExpansionPanel } from './SettingsExpansionPanel';

export const JiraDomainOptions = () => {
  return <SettingsExpansionPanel property={'jiraDomain'} panelSummary='Jira domain' placeholder='.Jira.domain.com' />;
};
