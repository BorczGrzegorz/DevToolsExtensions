import * as React from 'react';
import { AddressDto } from '../../../api/devToolsApi';
import { ExpansionPanel, ExpansionPanelSummary, Typography } from '@material-ui/core';
import { getEngine } from '../../../engine/engine';

export interface SingleAddressPanelProps {
    address: AddressDto,
}

export const SingleAddressPanel = ({address} : SingleAddressPanelProps) => {

    const onClick = () => {
        getEngine().openTab(address.path);
    }

    return (
        <ExpansionPanel onClick={onClick}>
            <ExpansionPanelSummary >
                <Typography>{address.name}</Typography>
            </ExpansionPanelSummary>
        </ExpansionPanel>
    )
}