import * as React from 'react';
import {
  ExpansionPanel,
  ExpansionPanelSummary,
  Typography,
  ExpansionPanelDetails,
  Button,
  Grid,
} from '@material-ui/core';
import { AddressDto, MachineDto } from '../../../api/devToolsApi';
import { getEngine } from '../../../engine/engine';
import { openCombinedAddress } from '../../../common/helpers';

export interface AddressesExpansionPanelProps {
  address: AddressDto;
  machines: MachineDto[];
  expanded: boolean;
  onClick: (address: AddressDto) => void;
}

export const AddressesExpansionPanel = ({
  address,
  machines,
  expanded,
  onClick,
}: AddressesExpansionPanelProps) => {
  const onMachineClick = (machine: MachineDto) => {
    openCombinedAddress(machine, address);
  };

  return (
    <ExpansionPanel expanded={expanded}>
      <ExpansionPanelSummary onClick={() => onClick(address)}>
        <Typography>{address.name}</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <Grid container direction='column'>
          {machines.map((machine) => (
            <Button key={machine.id} onClick={() => onMachineClick(machine)}>
              <Typography color='textSecondary'>{machine.name}</Typography>
            </Button>
          ))}
        </Grid>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
};
