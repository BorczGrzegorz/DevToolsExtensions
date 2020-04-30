import * as React from 'react';
import { SettingsExpansionPanel } from './SettingsExpansionPanel';

export const BoardIdOptions = () => {
    return (
        <SettingsExpansionPanel property={"boardId"} 
                                panelSummary='Board identifier' 
                                placeholder='board identifier'/>
    )
}