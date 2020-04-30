import React from 'react';
import { useParams, useHistory, useLocation } from 'react-router';
import { useSelector } from 'react-redux';
import { PopupAppState } from './../Models/AppState';
import { UserDatesWorklog } from '../Models/UsersDateWorklog';
import moment from 'moment';
import { List } from '@material-ui/core';
import { UserDaySummaryItem } from './UserDaySummaryItem';
import { getDateHours } from '../calculators';

export const UserDaySummary = () => {
    let { userName }: { userName?: string | undefined } = useParams();
    const userDatesWorklogs = useSelector<PopupAppState, UserDatesWorklog>(x => x.usersWorklogs[userName as string]);
    const history = useHistory();
    const location = useLocation();

    return (
        <List>
            {
                Object.keys(userDatesWorklogs).map(key => {
                    return (
                        <UserDaySummaryItem day={moment(key).format('dddd')} 
                                            hours={getDateHours(userDatesWorklogs[key])}
                                            onClick={() => history.push(location.pathname + '/date/' + key)}/>)
                })
            }
         </List>
    )
}