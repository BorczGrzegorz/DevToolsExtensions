import * as React from 'react';
import { Grid, Typography, TextField, Button, styled } from '@material-ui/core';
import { Settings, DefaultSettings, SETTINGS_KEY } from '../../models/Settings';
import { getEngine } from '../../engine/engine';

export interface SetupPageProps {
    children: React.ReactNode;
}

const GradientButton = styled(Button)({
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    color: 'white',
    height: 48,
    border: 0,
    borderRadius: 3,
    boxShadow: '0 7px 9px 5px rgba(255, 105, 135, .3)',
    marginTop: '10px',
    minWidth: '90px'
});

const ServerTextField = styled(TextField)({
    marginTop: '13px',
    marginBottom: '10px',
})

const Container = styled(Grid)({
    minHeight: '500px',
});

export const SetupPage = ({ children }: SetupPageProps) => {

    const [settings, setSettings] = React.useState<Settings | null>(null);
    const [address, setAddress] = React.useState<string>('');

    const getSettings = async () => {
        let currentSetings = await getEngine().getFromStore<Settings | null>(SETTINGS_KEY);
        if (!currentSetings) {
            currentSetings = DefaultSettings;
        }

        setSettings(currentSetings);
    }

    React.useEffect(() => {
        getSettings();
    }, [])

    const onSetSettings = async () => {
        if (settings) {
            const newSettings : Settings = {...settings, serverAddress: address};
            getEngine().saveInStore<Settings>(SETTINGS_KEY, newSettings);
            setSettings(newSettings);
        }
    }

    if (!settings) {
        return (
            <div>Thinking...</div>
        )
    }

    if (!settings.serverAddress || settings.serverAddress === '') {
        return (
            <Container container
                       direction='column'
                       alignItems='center'
                       justify='center'>
                <Typography color='secondary' >
                    Please
                </Typography>
                <Typography color='secondary' >
                    Set server address
                </Typography>
                <Typography color='secondary' >
                    Thanks! :)
                </Typography>
                <ServerTextField color='secondary'
                    label='server address'
                    value={address}
                    onChange={e => setAddress(e.target.value)} />
                <GradientButton onClick={onSetSettings}>Set address</GradientButton>
            </Container>
        )
    }

    return (
        <>
            {children}
        </>
    );
} 