import * as React from 'react';
import { ExpansionPanel, ExpansionPanelSummary, Typography, ExpansionPanelDetails, TextField, styled } from '@material-ui/core';
import { Settings, DefaultSettings, SETTINGS_KEY } from './../models/Settings';
import { getEngine } from './../engine/engine';

const ServerAddressTextField = styled(TextField)({
    minWidth: '500px'
});

export const ServerAddressOptions = () => {

    const [settings, setSettings] = React.useState<Settings>(DefaultSettings);

    const getSettings = async () => {
        const settings = await getEngine().getFromStore<Settings>(SETTINGS_KEY);
        if (settings) {
            setSettings(settings);
        }
    }

    React.useEffect(() => {
        getSettings();
    }, []);

    const onServerAddresChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newSettings: Settings = { ...settings, serverAddress: event.target.value };
        getEngine().saveInStore(SETTINGS_KEY, newSettings);
        setSettings(newSettings);
    };

    return (
        <ExpansionPanel>
            <ExpansionPanelSummary>
                <Typography>DevTools server address</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
                <ServerAddressTextField label='server address' value={settings.serverAddress} onChange={onServerAddresChange} />
            </ExpansionPanelDetails>
        </ExpansionPanel>
    )
}