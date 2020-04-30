import * as React from 'react';
import { ListItem, ListItemText, Divider, ListItemAvatar, Avatar, styled, Tooltip } from '@material-ui/core';
import { ClockListItemText } from './ClockListItemText';
import { useSelector } from 'react-redux';
import { AppState, Machine, UsersDictionary } from './../../models/AppState';

export interface MachineStateListItemProps {
    machineId: string,
    projectKey: string,
    onClick: (projectKey: string, machineId: string) => any
}

export const FreeListItemText = styled(ListItemText)({
    marginLeft: '56px'
})

export const MachineStateListItem = ({ machineId, projectKey, onClick }: MachineStateListItemProps) => {

    const machine: Machine = useSelector<AppState, Machine>(x => x.machines[projectKey][machineId])
    const users: UsersDictionary = useSelector<AppState, UsersDictionary>(x => x.users);

    return (
        <>
            <ListItem button selected={!!machine.user} onClick={() => onClick(projectKey, machineId)}>
                {machine.user && <ListItemAvatar>
                    <Tooltip title={users[machine.user].displayName}>
                        <Avatar src={users[machine.user].avatar} />
                    </Tooltip>
                </ListItemAvatar>
                }
                {
                    machine.lockedDate != null
                        ? <ClockListItemText devName={machine.name} lockedDate={machine.lockedDate} />
                        : <FreeListItemText primary={machine.name} secondary={"FREE MACHINE"} />
                }
            </ListItem>
            <Divider />
        </>
    )
}