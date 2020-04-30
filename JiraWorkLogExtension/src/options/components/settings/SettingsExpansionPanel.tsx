import * as React from 'react';
import { ExpansionPanel, ExpansionPanelSummary, Typography, ExpansionPanelDetails, TextField, styled } from '@material-ui/core';
import { OptionsAppState } from '../../models/OptionsAppState';
import { useSelector, useDispatch } from 'react-redux';
import { changeSettings } from '../../actions/actions';
import { Settings } from '../../../models/Settings';

const ServerAddressTextField = styled(TextField)({
    minWidth: '500px'
});

export interface SettingsExpansionPanelProps{
    property: keyof Settings,
    placeholder: string,
    panelSummary: string
}

export const SettingsExpansionPanel = ({property, placeholder, panelSummary}: SettingsExpansionPanelProps) => {
    const settings = useSelector<OptionsAppState, Settings>(x => x.settings);
    const dispatch = useDispatch();
    const onServerAddresChange = (event: React.ChangeEvent<HTMLInputElement>) => {
         dispatch(changeSettings({...settings, [property]: event.target.value}));
      };

    return (
        <ExpansionPanel>
            <ExpansionPanelSummary>
                <Typography>{panelSummary}</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
                <ServerAddressTextField label={placeholder} value={settings[property]} onChange={onServerAddresChange}/>
            </ExpansionPanelDetails>
        </ExpansionPanel>
    )
}