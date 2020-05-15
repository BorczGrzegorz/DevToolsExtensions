import React from 'react';
import { Grid, Typography, styled } from '@material-ui/core';

const Container = styled(Grid)({
  minHeight: '500px',
  paddingLeft: '20px',
  paddingRight: '20px',
});

const MessageText = styled(Typography)({
  maxWidth: '200px',
});

const StatusCodeText = styled(Typography)({
  fontSize: '24px',
  marginBottom: '10px',
});

export interface StatusErrorPageProps {
  code: number | undefined;
  message: React.ReactNode;
}

export const StatusErrorPage = ({ code, message }: StatusErrorPageProps) => {
  return (
    <Container container direction='column' alignItems='center' justify='center'>
      {code && <StatusCodeText color='secondary'>{code}</StatusCodeText>}
      <MessageText align='center'>{message}</MessageText>
    </Container>
  );
};
