import * as React from 'react';
import { IssueSummary } from '../../models/UserSummary';
import { ExpansionPanel, ExpansionPanelSummary, Typography, ExpansionPanelDetails, Grid } from '@material-ui/core';
import copy from 'copy-to-clipboard';
import styled from 'styled-components';
import moment from 'moment';
import { useSnackbar } from 'notistack';

export interface SummaryExpansionPanelProps {
    date: string;
    issues: IssueSummary[];
    expanded: boolean;
    onChange: (date: string) => void;
}

const IssueText = styled(Typography)`
    ${({ theme }) => `
        margin-bottom: 15px;
        margin-right: 10px;
        cursor: pointer;
        color: ${theme.palette.text.secondary}
    `}
`;

export const SummaryExpansionPanel = (props: SummaryExpansionPanelProps) => {

    const { enqueueSnackbar } = useSnackbar();

    const onTextClick = (e : React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
        const text: string = e.currentTarget.innerHTML;
        copy(text);
        enqueueSnackbar(`Copied ${text}`, {variant: 'success'});
    }

    return (
        <>
            <ExpansionPanel expanded={props.expanded}
                onChange={() => props.onChange(props.date)}>
                <ExpansionPanelSummary>
                    <Typography>{moment(props.date).format('LL')}</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <Grid container direction='column'>
                        {
                            props.issues.map(issue => (
                                <Grid container direction='row' key={issue.issueId}>
                                <IssueText onClick={onTextClick}>{issue.key} {issue.summary}</IssueText>
                                <IssueText onClick={onTextClick}>{moment.duration(issue.timeSpentSeconds, 'seconds').asHours().toFixed(2)}h</IssueText>
                                </Grid>
                            ))
                        }
                    </Grid>
                </ExpansionPanelDetails>
            </ExpansionPanel>
        </>
    )
}