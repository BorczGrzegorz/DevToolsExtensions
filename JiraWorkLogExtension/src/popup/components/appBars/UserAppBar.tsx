import * as React from 'react';
import { useParams, useHistory } from 'react-router';
import { useSelector } from 'react-redux';
import { PopupAppState } from './../../Models/AppState';
import { AppBar, Grid, Toolbar, IconButton, Typography, styled } from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { User } from '../../Models/User';

const StyledAppBar = styled(AppBar)({
  background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
  color: 'white',
});

export const UserAppBar = () => {
    let {userName} = useParams();
    const history = useHistory();
    const user = useSelector<PopupAppState, User>(x => x.users[userName as string]);

    return(
        <StyledAppBar position='static'>
            <Grid container direction="row" alignItems='flex-start' justify='flex-start'>
            <Toolbar>
              <IconButton onClick={() => history.goBack()}>
                <ChevronLeftIcon />
              </IconButton>
              <Typography>{user.displayName}</Typography>
            </Toolbar>
          </Grid>
        </StyledAppBar>
    )
}