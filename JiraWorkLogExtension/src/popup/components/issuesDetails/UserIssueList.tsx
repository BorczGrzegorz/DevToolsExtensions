import * as React from 'react';
import { useParams } from 'react-router';
import { useSelector } from 'react-redux';
import { PopupAppState } from './../../Models/AppState';
import { DateWorklog } from '../../Models/UsersDateWorklog';
import { List, ListItem, ListItemText, Divider } from '@material-ui/core';
import moment from 'moment';

export const UserIssueList = () => {
    let { userName, date } = useParams();
    const dayWorkLogs = useSelector<PopupAppState, DateWorklog[]>(x => x.usersWorklogs[userName as string][date as string])
    return (
        <List>
            {dayWorkLogs.map(x => (
                <>
                <ListItem key={x.issueId}>
                    <ListItemText>
                        {x.key} {x.summary} {moment.duration(x.timeSpentSeconds, 'seconds').asHours().toFixed(2)}h
                    </ListItemText>
                </ListItem>
                <Divider/>
                </>
            ))}
        </List>
    )
}