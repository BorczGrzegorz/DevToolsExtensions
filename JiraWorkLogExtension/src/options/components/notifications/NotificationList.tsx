import React from 'react';
import { Tabs, Tab, styled } from '@material-ui/core';
import { Notification, Issue } from '../../../models/Notifications';
import { ErrorCard } from './ErrorCard';
import { IssueCard } from './IssueCard';
import { logWork } from '../../actions/actions';
import { useDispatch } from 'react-redux';

export interface NotificationListProps {
  item: Notification;
}

const CustomTabs = styled(Tabs)({
  maxWidth: '700px',
});

export const NotificationList = ({ item }: NotificationListProps) => {
  const dispatch = useDispatch();

  if (item.error && !(item.issues && item.issues.length > 0)) {
    return <ErrorCard key={item.creationDate} />;
  }

  const onLog = (issue: Issue) => {
    dispatch(logWork(item, issue.id));
  };

  return (
    <CustomTabs
      key={item.creationDate}
      scrollButtons='on'
      value={1}
      variant='scrollable'
      indicatorColor='#fff'
    >
      {item.issues.map((issue, i) => (
        <Tab
          value={i}
          key={i}
          label={<IssueCard issue={issue} onLog={onLog} />}
        />
      ))}
    </CustomTabs>
  );
};
