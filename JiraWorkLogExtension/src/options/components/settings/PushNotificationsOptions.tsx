import * as React from 'react';
import { ExpansionPanel, ExpansionPanelSummary, FormControlLabel, Switch, ExpansionPanelDetails, Slider } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { OptionsAppState } from '../../models/OptionsAppState';
import { useState } from 'react';
import { changeSettings } from '../../actions/actions';
import { Settings } from '../../../models/Settings';

export const PushNotificationOptions = () => {
    const settings = useSelector<OptionsAppState, Settings>(x => x.settings);
    const dispatch = useDispatch();
    const [sliderValue, setSliderValue] = useState<number>(settings.delayInMinutes);

    const onChangePushEnabled = (e: any, value: boolean) => {
        dispatch(changeSettings({...settings, isPushNotificationEnabled: value}));
    }

    const OnSliderChangeCommited = (e: any, value: any) => {
        dispatch(changeSettings({...settings, delayInMinutes : value}));
    }
    
    return (
        <ExpansionPanel expanded={settings.isPushNotificationEnabled} onChange={onChangePushEnabled}>
                <ExpansionPanelSummary>
                    <FormControlLabel control={<Switch checked={settings.isPushNotificationEnabled} />} label='Push notifications' />
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <Slider 
                        value={sliderValue}
                        onChange={(e, value: any) => setSliderValue(value)}
                        onChangeCommitted={OnSliderChangeCommited}
                        step={5}
                        min={5}
                        max={500}
                        marks={[{
                            value: 15,
                            label: '15min'
                        },
                        {
                            value: 60,
                            label: '1h'
                        },
                        {
                            value: 480,
                            label: '8h'
                        }]}
                        valueLabelDisplay="auto" />
                </ExpansionPanelDetails>
            </ExpansionPanel>
    )
}