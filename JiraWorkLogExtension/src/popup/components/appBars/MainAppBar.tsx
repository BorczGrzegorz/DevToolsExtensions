import * as React from 'react';
import { useSelector } from 'react-redux';
import { PopupAppState } from './../../Models/AppState';
import { UsersDateWorklog } from '../../Models/UsersDateWorklog';
import { Grid, Toolbar, AppBar, Typography, styled } from '@material-ui/core';
import { getWholeHours } from '../../calculators';

const StyledAppBar = styled(AppBar)({
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    color: 'white',
});

export const MainAppBar = () => {
    const worklogs = useSelector<PopupAppState, UsersDateWorklog>(x => x.usersWorklogs);

    return (
        <StyledAppBar position='static'>
            <Grid container alignItems='center' justify='center'>
                <Toolbar>
                    <Typography>
                        {`${getWholeHours(worklogs).toFixed(2)}h`}
                    </Typography>
                </Toolbar>
            </Grid>
        </StyledAppBar>
    )
} 