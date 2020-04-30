import React, { useEffect } from 'react';
import { List, Grid, styled } from '@material-ui/core';
import { MachineStateListItem } from './MachineStateListItem';
import { useParams } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { AppState, MachineDictionary, Machine, User } from './../../models/AppState';
import { changeLastSelectedProduct, lockMachineAction } from '../../actions/actions';
import { releaseMachineAction } from './../../actions/actions';


const StrechList = styled(List)({
    minWidth: '100%'
});

export const MachineStateList = () => {

    let project = '';
    let { projectKey } = useParams();
    if (projectKey) {
        project = projectKey;
    }

    const machines: MachineDictionary = useSelector<AppState, MachineDictionary>(x => x.machines[project]);
    const currentUser: User | null = useSelector<AppState, User | null>(x => x.currentUser);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(changeLastSelectedProduct(project));
    }, [projectKey]);

    if (!machines) {
        return <div>Nothing :(</div>
    }

    const onMachineClick = (projectKey: string, machineId: string) => {
        if (!currentUser) {
            return;
        }

        const selectedMachine: Machine = machines[machineId];
        if (selectedMachine.user !== '' && selectedMachine.user !== currentUser.key) {
            return;
        }

        if (selectedMachine.lockedDate === null) {
            dispatch(lockMachineAction(projectKey, machineId, currentUser.key));
        } else {
            dispatch(releaseMachineAction(projectKey, machineId, currentUser.key));
        }
    }

    return (
        <Grid container>
            <StrechList>
                {
                    Object.keys(machines).map((key: string) => (
                        <MachineStateListItem key={key} projectKey={project} machineId={key} onClick={onMachineClick} />
                    ))
                }
            </StrechList>
        </Grid>
    )
}