import React from 'react';
import { useSelector } from 'react-redux';
import { Notification } from '../../../models/Notifications';
import { OptionsAppState } from '../../models/OptionsAppState';
import _, { Dictionary } from 'lodash';
import { NotificationExpansionPannel } from './NotificationExpansionPannel';

const groupByDate = (notification: Notification): Date => {
  const creation = new Date(notification.creationDate);
  return new Date(creation.getFullYear(), creation.getMonth() + 1, creation.getDay());
};

export const NotificationPage = () => {
  const notifications = useSelector<OptionsAppState, Notification[]>((x) => x.notifications);

  const dictionary: Dictionary<Notification[]> = _(notifications)
    .sortBy((x) => x.creationDate)
    .groupBy(groupByDate)
    .value();

  return (
    <>
      {Object.keys(dictionary).map((key) => (
        <NotificationExpansionPannel date={key} key={key} items={dictionary[key]} />
      ))}
    </>
  );
};
