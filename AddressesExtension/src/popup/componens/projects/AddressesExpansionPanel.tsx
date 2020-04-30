import * as React from 'react';
import { ExpansionPanel, ExpansionPanelSummary, Typography, ExpansionPanelDetails, Button, Grid } from '@material-ui/core';
import { AddressDto, MachineDto } from '../../../api/devToolsApi';
import { getEngine } from '../../../engine/engine';

export interface AddressesExpansionPanelProps {
    address: AddressDto,
    machines: MachineDto[],
    expanded: boolean,
    onClick: (address: AddressDto) => void
}

const trimRight = (address: string) => {
    if(address[address.length - 1] === '/'){
        return address.substring(0, address.length - 1);
    }

    return address;
}

const trimLeft = (address: string) => {
    if(address[0] === '/'){
        return address.substring(1, address.length);
    }

    return address;
}

export const AddressesExpansionPanel = ({ address, machines, expanded, onClick }: AddressesExpansionPanelProps) => {

    const onMachineClick = (machine: MachineDto) => {
        const trimmedAddress = trimLeft(address.path);
        const trimedMachine = trimRight(machine.address);
        getEngine().openTab(`${trimedMachine}/${trimmedAddress}`);
    }

    return (
        <ExpansionPanel expanded={expanded}>
            <ExpansionPanelSummary onClick={() => onClick(address)}>
                <Typography>{address.name}</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
                <Grid container direction='column'>
                    {machines.map(machine => (
                        <Button key={machine.id} onClick={() => onMachineClick(machine)}>
                            <Typography color='textSecondary'>{machine.name}</Typography>
                        </Button>
                    ))}
                </Grid>
            </ExpansionPanelDetails>
        </ExpansionPanel>
    )
}