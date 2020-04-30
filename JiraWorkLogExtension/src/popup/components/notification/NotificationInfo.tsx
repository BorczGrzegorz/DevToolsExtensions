import React, { useState, useEffect } from 'react';
import { getEngine } from '../../../engine';
import { NOTIFICATIONS_KEY } from '../../../models/Consts';
import { styled, Grid, Typography, Button } from '@material-ui/core';
import MailOutlineIcon from '@material-ui/icons/MailOutline';

const Container = styled(Grid)({
  minHeight: '500px'
});

const GradientButton = styled(Button)({
  background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
  color: 'white',
  height: 48,
  border: 0,
  borderRadius: 3,
  boxShadow: '0 7px 9px 5px rgba(255, 105, 135, .3)',
  marginTop: '10px',
  minWidth: '90px',
});

const MessageIcon = styled(MailOutlineIcon)({
  fontSize: 40
});

export const NotificationInfo = ({ children }: { children: React.ReactNode }) => {
  const [notificationsCount, setNotificationsCount] = useState<number | null>(null);

  const getNotifications = async () => {
    const notifications = await getEngine().getFromStore<Notification[]>(NOTIFICATIONS_KEY);
    if (!notifications) {
      setNotificationsCount(0);
    } else {
      setNotificationsCount(notifications.length);
    }
  };

  useEffect(() => {
    getNotifications();
  }, []);

  if (notificationsCount === null || notificationsCount === undefined) {
    return <>Loading Notifications...</>;
  }

  if (notificationsCount === 0) {
    return <>{children}</>;
  }

  return (
    <Container container 
               direction='column' 
               alignItems='center' 
               justify='center'>
      <MessageIcon />
      <Typography>You have {notificationsCount} messages!</Typography>
      <Grid container direction='row' justify='space-evenly'>
        <GradientButton onClick={() => getEngine().openOptions()}>Show</GradientButton>
        <GradientButton onClick={() => setNotificationsCount(0)}>Skip</GradientButton>
      </Grid>
    </Container>
  );
};
