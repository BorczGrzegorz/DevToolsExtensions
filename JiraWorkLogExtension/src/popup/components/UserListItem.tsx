import * as React from 'react';
import { ListItem, Divider, ListItemAvatar, Avatar, ListItemText } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { PopupAppState } from '../Models/AppState';
import { User } from '../Models/User';
import { useHistory } from 'react-router';

export interface UserListItemProps {
    userName: string,
    hours: number
}

export const UserListItem = (props: UserListItemProps) => {
    const user = useSelector<PopupAppState, User>(x => x.users[props.userName]);
    const history = useHistory();
    if (!user) {
        return null;
    }

    return (
        <>
            <ListItem button alignItems='flex-start' onClick={() => history.push(`/user/${props.userName}`)}>
                <ListItemAvatar>
                    <Avatar src={user.avatarSrc}/>
                </ListItemAvatar>
                <ListItemText primary={user.displayName} secondary={`${props.hours.toFixed(2)}h`} />
            </ListItem>
            <Divider />
        </>
    )
}