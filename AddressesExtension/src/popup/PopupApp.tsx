import React from 'react';
import { styled, Grid, Tabs } from '@material-ui/core';
import { SetupPage } from './componens/SetupPage';
import { Root } from './componens/Root';

const MainContainer = styled(Grid)({
    minWidth: '225px',
    maxWidth: '225px',
    minHeight: '500px',
    maxHeight: '500px'
})

const Scrollable = styled(Tabs)({
    maxHeight: '100%'
});

export const PopupApp = () => {
    return (
        <Scrollable value={1} orientation='vertical' variant='scrollable'>
            <MainContainer container alignContent='flex-start'>
                <SetupPage>
                    <Root />
                </SetupPage>
            </MainContainer>
        </Scrollable>
    )
}