import * as React from 'react';
import { AxiosError } from 'axios';
import { Grid, Typography } from '@material-ui/core';

export interface ErrorProps {
    error: Error
}

interface AxiosErrorProps {
    error: AxiosError<any>
}

const AxiosErrorPage = (props: AxiosErrorProps) => {
    let { error } = props;
    return (
        <div>
            <Typography color='secondary'>
                {error.message}
            </Typography>
            
            { error.config && error.config.url && 
                <Typography color='secondary'>
                    {error.config.url}
                </Typography>
            }
        </div>
    )
}

export const ErrorPage = (props: ErrorProps) => {
    let { error } = props;
    const axiosError = error as AxiosError<any>;
    if (axiosError) {
        return <AxiosErrorPage error={axiosError} />
    }

    return (
        <Grid container alignItems='center' alignContent='center' justify='center'>
            <Typography color='secondary'>
                 Something went wrong :(
            </Typography>
        </Grid>
    )
}