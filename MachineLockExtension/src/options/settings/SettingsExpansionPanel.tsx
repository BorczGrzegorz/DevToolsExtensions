import * as React from 'react';
import {
  ExpansionPanel,
  ExpansionPanelSummary,
  Typography,
  ExpansionPanelDetails,
  TextField,
  styled,
} from '@material-ui/core';
import { Settings, DefaultSettings, SETTINGS_KEY } from './../../models/Settings';
import { getEngine } from '../../engine/engine';

const ServerAddressTextField = styled(TextField)({
  minWidth: '500px',
});

export interface SettingsExpansionPanelProps {
  property: keyof Settings;
  placeholder: string;
  panelSummary: string;
}

export const SettingsExpansionPanel = ({ property, placeholder, panelSummary }: SettingsExpansionPanelProps) => {
  const [settings, setSettings] = React.useState<Settings>(DefaultSettings);

  const getSettings = async () => {
    const settings = await getEngine().getFromStore<Settings>(SETTINGS_KEY);
    if (settings) {
      setSettings(settings);
    }
  };

  React.useEffect(() => {
    getSettings();
  }, []);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSettings: Settings = { ...settings, [property]: event.target.value };
    getEngine().saveInStore(SETTINGS_KEY, newSettings);
    setSettings(newSettings);
  };

  return (
    <ExpansionPanel>
      <ExpansionPanelSummary>
        <Typography>{panelSummary}</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <ServerAddressTextField placeholder={placeholder} value={settings[property]} onChange={onChange} />
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
};
