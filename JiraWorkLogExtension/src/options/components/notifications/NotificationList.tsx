import React from 'react';
import { Tabs, Tab, Card } from '@material-ui/core';
import { Notification } from '../../../models/Notifications';
import { ErrorCard } from './ErrorCard';

export interface NotificationListProps {
  item: Notification;
}

export const NotificationList = ({ item }: NotificationListProps) => {
  if (item.error) {
    return <ErrorCard />;
  }

  return (
    <>
      <Tabs scrollButtons='auto' value={null} variant='scrollable' disabled>
        <Tab label={<Card>tesete</Card>} />
        <Tab label={<Card>tesete</Card>} />
        <Tab label={<Card>tesete</Card>} />
        <Tab label={<Card>tesete</Card>} />
        <Tab label={<Card>tesete</Card>} />
        <Tab label={<Card>tesete</Card>} />
      </Tabs>
    </>
  );
};
