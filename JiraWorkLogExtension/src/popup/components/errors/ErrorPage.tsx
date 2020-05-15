import * as React from 'react';
import { AxiosError, AxiosResponse } from 'axios';
import { Grid, Typography, Link } from '@material-ui/core';
import { StatusErrorPage } from './StatusErrorPage';
import { getEngine } from '../../../engine';

export interface ErrorProps {
  error: Error;
}

interface AxiosErrorProps {
  error: AxiosError<any>;
}

const getBadRequestMessage = (response: AxiosResponse<any>): React.ReactNode => {
  switch (response.data.code) {
    case 4001:
      return 'You have to specify boarId!🙄';
    default:
      return 'There is some problem with request 🤷‍♀️';
  }
};

const getNotFoundMessage = (response: AxiosResponse<any>): React.ReactNode => {
  switch (response.data.code) {
    case 4002:
      return 'We have some problem with boardId. You have to check that 🍀';
    default:
      return 'Cannot find some resource 🤔';
  }
};

const getErrorMessage = (error: AxiosError<any>): React.ReactNode => {
  if (error.message === 'Network Error') {
    return 'There is some problem with network connection 🌍 Check your connection or server address 🅿';
  }

  switch (error.response?.status) {
    case 400:
      return getBadRequestMessage(error.response);
    case 401:
      return 'First log into Jira 🤸‍♂️';
    case 403:
      return 'Mayby you shoud log into Jira one more time 🤔?';
    case 404:
      return getNotFoundMessage(error.response);
    case 500:
      return (
        <>
          <Typography>I admit that... It's my fault 🙈</Typography>
          <Typography>Please, visit</Typography>
          <Link href='#' onClick={() => getEngine().openTab('https://github.com/BorczGrzegorz/DevToolsExtensions')}>
            DevTools
          </Link>
          <Typography>and report bug. Thanks!</Typography>
        </>
      );
    default:
      return (
        <>
          <Typography>Something strange happened! I have no idea what's going on!😱</Typography>
          <Typography>Please, visit</Typography>
          <Link href='#' onClick={() => getEngine().openTab('https://github.com/BorczGrzegorz/DevToolsExtensions')}>
            DevTools
          </Link>
          <Typography>and report bug. Thanks!</Typography>
        </>
      );
  }
};

const AxiosErrorPage = (props: AxiosErrorProps) => {
  let { error } = props;
  const message: React.ReactNode = getErrorMessage(error);
  return <StatusErrorPage code={error.response?.status} message={message} />;
};

export const ErrorPage = (props: ErrorProps) => {
  let { error } = props;
  const axiosError = error as AxiosError<any>;
  if (axiosError) {
    return <AxiosErrorPage error={axiosError} />;
  }

  return (
    <Grid container alignItems='center' alignContent='center' justify='center'>
      <Typography color='secondary'>Something went wrong :(</Typography>
    </Grid>
  );
};
