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
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import moment from 'moment';
import { ConfirmationDialog } from '../../../controls/ConfirmationDialog';
import { Notification } from '../../../models/Notifications';
import { NotificationList } from './NotificationList';

export interface NotificationExpansionPannelProps {
  date: string;
  items: Notification[];
}

export const NotificationExpansionPannel = (props: NotificationExpansionPannelProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <>
      <ExpansionPanel>
        <ExpansionPanelSummary>
          <Typography>{moment(props.date).format('D MMMM')}</Typography>
          <DeleteIcon color='action' onClick={() => setIsDialogOpen(true)} />
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Grid container direction='row'>
            {props.items.map((x) => (
              <>
                <NotificationList key={x.creationDate} item={x} />
                <NotificationList key={x.creationDate} item={x} />
                <NotificationList key={x.creationDate} item={x} />
              </>
            ))}
          </Grid>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ConfirmationDialog
        confirmationTitle='Remove notifications'
        textContent='Are you sure?'
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onConfirm={() => {}}
      />
    </>
  );
};
