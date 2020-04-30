import React from 'react';
import { Grid, Card, styled } from '@material-ui/core';
import { JiraDomainOptions } from './settings/JiraDomainOptions';
import { ServerAddressOptions } from './settings/ServerAddressOptions';

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
  bottom: 0,
});

export const OptionsApp = (props) => {
  return (
    <Background container justify='center'>
      <LayoutCard>
        <ServerAddressOptions />
        <JiraDomainOptions />
      </LayoutCard>
    </Background>
  );
};
