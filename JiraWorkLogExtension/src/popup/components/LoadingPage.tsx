import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PopupAppState } from '../Models/AppState';
import { UsersDateWorklog } from '../Models/UsersDateWorklog';
import { useEffect } from 'react';
import { loadData } from '../actions/actions';
import { Grid, CircularProgress } from '@material-ui/core';
import { Navigation } from './Navigation';
import { ErrorPage } from './errors/ErrorPage';

export const LoadingPage = () => {
  const usersWorklogs = useSelector<PopupAppState, UsersDateWorklog>((x) => x.usersWorklogs);
  const error = useSelector<PopupAppState, Error | null>((x) => x.errorMessage);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadData());
  }, []);

  if (error !== null) {
    return <ErrorPage error={error} />;
  }

  if (Object.keys(usersWorklogs).length === 0) {
    return (
      <Grid container alignItems='center' justify='center'>
        <CircularProgress color='secondary' />
      </Grid>
    );
  }

  return <Navigation />;
};
