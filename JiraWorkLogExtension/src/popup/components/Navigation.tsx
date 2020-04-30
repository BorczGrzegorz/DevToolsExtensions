import * as React from 'react';
import { Route } from 'react-router';
import { UserList } from './UserList';
import { UserDaySummary } from './UserDaySummary';
import { MainAppBar } from './appBars/MainAppBar';
import { UserAppBar } from './appBars/UserAppBar';
import { UserIssueList } from './issuesDetails/UserIssueList';

export const Navigation = () => {
    return (
        <>
            <Route exact path='/'>
                <>
                    <MainAppBar/>
                    <UserList/>
                </>
            </Route>
            <Route exact path='/user/:userName'>
                <>
                    <UserAppBar/>
                    <UserDaySummary/>
                </>
            </Route>
            <Route exact path='/user/:userName/date/:date'>
                <>
                    <UserAppBar/>
                    <UserIssueList/>
                </>
            </Route>
        </>
    )
}