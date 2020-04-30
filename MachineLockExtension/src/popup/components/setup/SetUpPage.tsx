import * as React from 'react';
import { Grid, Typography, TextField, Button, styled } from '@material-ui/core';
import { Settings, DefaultSettings, SETTINGS_KEY } from '../../../models/Settings';
import { getEngine } from '../../../engine/engine';

export interface SetupPage {
  children: React.ReactNode;
  text: string[];
  placeholder?: string;
  settingsPropertyName: keyof Settings;
}

const GradientButton = styled(Button)({
  background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
  color: 'white',
  height: 48,
  border: 0,
  borderRadius: 3,
  boxShadow: '0 7px 9px 5px rgba(255, 105, 135, .3)',
  marginTop: '10px',
  minWidth: '90px',
});

const StyledTextField = styled(TextField)({
  marginTop: '13px',
  marginBottom: '10px',
});

const Container = styled(Grid)({
  minHeight: '500px',
});

export const SetupPage = ({ children, text, placeholder, settingsPropertyName }: SetupPage) => {
  const [settings, setSettings] = React.useState<Settings | null>(null);
  const [value, setValue] = React.useState<string>('');

  const onSetSettingsSave = async () => {
    if (settings) {
      const newSettings: Settings = { ...settings, [settingsPropertyName]: value };
      getEngine().saveInStore<Settings>(SETTINGS_KEY, newSettings);
      setSettings(newSettings);
    }
  };

  const getSettings = async () => {
    let currentSetings = await getEngine().getFromStore<Settings | null>(SETTINGS_KEY);
    if (!currentSetings) {
      currentSetings = DefaultSettings;
    }

    setSettings(currentSetings);
  };

  React.useEffect(() => {
    getSettings();
  }, []);

  if (!settings) {
    return <div>Thinking...</div>;
  }

  if (!settings[settingsPropertyName] || settings[settingsPropertyName] === '') {
    return (
      <Container container direction='column' alignItems='center' justify='center'>
        {text.map((x) => (
          <Typography color='secondary'>{x}</Typography>
        ))}
        <StyledTextField
          color='secondary'
          placeholder={placeholder}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <GradientButton onClick={onSetSettingsSave}>Save</GradientButton>
      </Container>
    );
  }

  return <>{children}</>;
};
