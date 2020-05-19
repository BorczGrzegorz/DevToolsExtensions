import * as React from 'react';
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  IconButton,
  CardHeader,
} from '@material-ui/core';
import { Issue } from '../../../models/Notifications';
import SendIcon from '@material-ui/icons/Send';

interface IssueCardProps {
  issue: Issue;
  onLog: (issue: Issue) => void;
}

export const IssueCard = ({ issue, onLog }: IssueCardProps) => {
  return (
    <Card>
      <CardHeader title={issue.key} />
      <CardContent>
        <Typography variant="subtitle1" color="textSecondary" component="p">
          {issue.summary}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton>
          <SendIcon
            onClick={(e) => {
              e.stopPropagation();
              onLog(issue);
            }}
          />
        </IconButton>
      </CardActions>
    </Card>
  );
};
