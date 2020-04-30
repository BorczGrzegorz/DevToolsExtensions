import * as React from 'react';
import { Grid, CircularProgress } from '@material-ui/core';

export const LoadingPage = () => {
    return (
        <Grid container alignItems='center' justify='center'>
            <CircularProgress color='secondary' />
        </Grid>
    )
}