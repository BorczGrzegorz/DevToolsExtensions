import * as React from 'react';
import { Grid, Card, styled, Tabs, Tab, AppBar } from '@material-ui/core';
import { useHistory, Route } from 'react-router';
import { SettingsPage } from './settings/SettingsPage';
import { SummaryPage } from './summary/SummaryPage';
import { NotificationPage } from './notifications/NotificationPage';

const LayoutCard = styled(Card)({
    width: '40%',
    minHeight: '100%',
    marginTop: '10px',
});

const Background = styled(Grid)({
    backgroundColor: '#f5f5f5',
    height: '100%',
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0
});

export const Layout = () => {

    const history = useHistory();

    return (
        <Background container justify='center'>
            <LayoutCard>
                <AppBar position='static' color='default'>
                    <Tabs value={history.location.pathname}
                        variant={'fullWidth'}
                        onChange={(e: any, value: string) => history.push(value)}>
                        <Tab label='Settings' value='/' />
                        <Tab label='Notifications' value='/notifications' />
                        <Tab label='Summary' value='/summary' />
                    </Tabs>
                </AppBar>
                <Route exact path='/' component={SettingsPage}/>
                <Route exact path='/notifications' component={NotificationPage}/>
                <Route exact path='/summary' component={SummaryPage}/>
            </LayoutCard>
        </Background>
    )
}