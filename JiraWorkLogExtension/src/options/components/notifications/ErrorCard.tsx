import React from 'react';
import {
  Card,
  Tabs,
  Tab,
  styled,
  CardContent,
  Typography,
  CardHeader,
} from '@material-ui/core';

const CustomCard = styled(Card)({
  minHeight: '100px',
  minWidth: '200px',
});

export const ErrorCard = () => {
  return (
    <Tabs
      scrollButtons="on"
      value={1}
      variant="scrollable"
      indicatorColor="#fff"
    >
      <Tab
        value={1}
        label={
          <CustomCard>
            <CardContent>
              <Typography
                variant="subtitle1"
                color="textSecondary"
                component="p"
              >
                ERROR
              </Typography>
            </CardContent>
          </CustomCard>
        }
      />
    </Tabs>
  );
};
