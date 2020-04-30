import * as React from 'react';
import { SettingsExpansionPanel } from './SettingsExpansionPanel';

export const ServerAddressOptions = () => {
  return (
    <SettingsExpansionPanel
      property={'serverAddress'}
      panelSummary='DevTools server address'
      placeholder='server address'
    />
  );
};
