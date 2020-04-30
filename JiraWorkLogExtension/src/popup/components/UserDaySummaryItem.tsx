import * as React from 'react';
import { ListItem, ListItemText, Divider } from '@material-ui/core';

export interface UserDaySummaryItemProps{
    day: string,
    hours: number,
    onClick: () => void
}

export const UserDaySummaryItem = (props: UserDaySummaryItemProps) => {
    return (
        <>
            <ListItem button onClick={props.onClick}>
                <ListItemText primary={props.day} secondary={`${props.hours.toFixed(2)}h`}/>
            </ListItem>
            <Divider component='li' />
        </>
    )
}