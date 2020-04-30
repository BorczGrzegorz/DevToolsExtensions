import * as React from 'react';
import { AddressDto, MachineDto } from '../../../api/devToolsApi';
import { Grid } from '@material-ui/core';
import { AddressesExpansionPanel } from './AddressesExpansionPanel';
import { SingleAddressPanel } from './SingleAddressPanel';

export interface AddressesExpansionPanelProps {
    addresses: AddressDto[],
    machines: MachineDto[]
}

export const AddressesList = ({ addresses, machines }: AddressesExpansionPanelProps) => {

    const [selectedAddress, setSelectedAddress] = React.useState('');

    const setExpanded = (name: string) => {
        if(name === selectedAddress){
            setSelectedAddress('');
            return;
        }

        setSelectedAddress(name);
    }

    return (
        <Grid container direction='column' alignItems='stretch'>
            {addresses.map(address => 
            ( address.isSingleUrl 
                ? <SingleAddressPanel address={address}/> 
                : <AddressesExpansionPanel
                    onClick={() => setExpanded(address.name)}
                    expanded={selectedAddress === address.name}
                    key={address.id}
                    address={address}
                    machines={machines} />))}
        </Grid>
    )
}