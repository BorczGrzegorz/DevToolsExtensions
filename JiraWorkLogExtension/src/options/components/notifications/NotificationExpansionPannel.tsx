import React, { useState } from 'react';
import {
  ExpansionPanel,
  ExpansionPanelSummary,
  Typography,
  ExpansionPanelDetails,
  Tabs,
  Card,
  Tab,
  Grid,
  styled,
  CardHeader,
  IconButton,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import moment from 'moment';
import { ConfirmationDialog } from '../../../controls/ConfirmationDialog';
import { Notification } from '../../../models/Notifications';
import { NotificationList } from './NotificationList';
import { deleteNotifications } from '../../actions/actions';
import { useDispatch } from 'react-redux';

export interface NotificationExpansionPannelProps {
  date: string;
  items: Notification[];
}

const Container = styled('div')({
  display: 'flex',
  flexDirection: 'column',
});

export const NotificationExpansionPannel = (
  props: NotificationExpansionPannelProps
) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const dispatch = useDispatch();
  return (
    <>
      <ExpansionPanel key={props.date}>
        <ExpansionPanelSummary>
          <Typography>{moment(props.date).format('D MMMM YYYY')}</Typography>
          <DeleteIcon
            color='action'
            onClick={(e) => {
              e.stopPropagation();
              setIsDialogOpen(true);
            }}
          />
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Grid key='notification-container' container direction='column'>
            {props.items.map((x, i) => (
              <Card>
                <CardHeader
                  title={moment(x.creationDate).format('HH:mm')}
                  action={
                    <IconButton
                      onClick={() => dispatch(deleteNotifications([x]))}
                    >
                      <DeleteIcon color='action' />
                    </IconButton>
                  }
                />
                <NotificationList key={i} item={x} />
              </Card>
            ))}
          </Grid>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ConfirmationDialog
        confirmationTitle='Remove notifications'
        textContent='Are you sure?'
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onConfirm={() => {
          dispatch(deleteNotifications(props.items));
        }}
      />
    </>
  );
};
