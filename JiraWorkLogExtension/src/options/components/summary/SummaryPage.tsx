import * as React from 'react';
import { Grid, CircularProgress } from '@material-ui/core';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { loadSummary } from '../../actions/actions';
import { OptionsAppState } from './../../models/OptionsAppState';
import { UserSummary } from '../../models/UserSummary';
import { SummaryExpansionPanel } from './SummaryExpansionPanel';
import { useState } from 'react';

const SummaryGrid = styled(Grid)`&&{
    height: 100%
}`;



export const SummaryPage = () => {
    const userSummary = useSelector<OptionsAppState, UserSummary | null>(x => x.userSummary);
    const [currentDay, setCurrentDate] = useState<string>("");
    const dispatch = useDispatch();
    React.useEffect(() => {
        if (userSummary) {
            return;
        }
        dispatch(loadSummary());
    }, [])

    if (!userSummary) {
        return (
            <SummaryGrid container alignItems='center' justify='center'>
                <CircularProgress color='secondary' size={70} />
            </SummaryGrid>
        )
    }

    return (
        <div>
            {
                Object.keys(userSummary).map(key => <SummaryExpansionPanel expanded={currentDay === key}
                                                                           onChange={day => setCurrentDate(day)}
                                                                           date={key} 
                                                                           issues={userSummary[key]} />)
            }
        </div>
    )
}