import * as React from 'react';
import { SetupPage } from './SetupPage';
export interface ServerSetupPage {
    children: React.ReactNode;
}


export const BacklogIdSetupPage = ({children}: ServerSetupPage) => {
    return (
        <SetupPage settingsPropertyName={"boardId"} text={['I also need', 'Board identifier', 'Thanks! :)']}>
            {children}
        </SetupPage>
    )
}