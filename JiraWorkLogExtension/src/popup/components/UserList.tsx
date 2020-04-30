import * as React from 'react';
import { Tabs, List } from '@material-ui/core';
import styled from 'styled-components';
import { UserListItem } from './UserListItem';
import { useSelector } from 'react-redux';
import { PopupAppState } from '../Models/AppState';
import { UsersDateWorklog, UserDatesWorklog } from '../Models/UsersDateWorklog';
import _ from 'lodash';
import { getUsersHours } from './../calculators/index';

const Scrollable = styled(Tabs)`&& {
    max-height: 100%;
}`;

export const UserList = () => {
    const usersWorklogs = useSelector<PopupAppState, UsersDateWorklog>(x => x.usersWorklogs);

    const orderedCollection = _(Object.keys(usersWorklogs).map((key: string) => { return { worklog: usersWorklogs[key], userName: key } }))
        .map((x) => { return { hours: getUsersHours(x.worklog), userName: x.userName } })
        .orderBy(x => x.hours, 'desc')
        .value();

    return (
        <Scrollable value={1} orientation='vertical' variant='scrollable' scrollButtons='off'>
            <List>
                {
                    orderedCollection.map(x => (
                    <UserListItem key={x.userName} userName={x.userName} hours={x.hours} />
                ))}
            </List>
        </Scrollable>
    )
} 