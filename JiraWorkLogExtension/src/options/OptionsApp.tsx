import React, { useState, useEffect } from 'react';
import reduxThunk from 'redux-thunk';
import { compose, applyMiddleware, createStore } from 'redux';
import { rootReducer } from './reducers';
import { OptionsAppState } from './models/OptionsAppState';
import { getEngine } from './../engine/index';
import { Provider } from 'react-redux';
import { Layout } from './components/Layout';
import { Route } from 'react-router';
import { SnackbarProvider } from 'notistack';
import { createMuiTheme, ThemeProvider as MuiThemeProvider } from '@material-ui/core';
import { ThemeProvider } from 'styled-components';
import createThunkErrorHandlerMiddleware from 'redux-thunk-error-handler';
import { errorHandler } from './actions/actions';
import { ErrorPage } from './ErrorPage';
import { Settings, DefaultSettings } from '../models/Settings';
import { SETTINGS_KEY, NOTIFICATIONS_KEY } from '../models/Consts';
import { Notification } from "../models/Notifications";

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

const createAppStore = async () => {
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    const engine = getEngine();
    let currentSettings = await engine.getFromStore<Settings>(SETTINGS_KEY);
    if (!currentSettings) {
        currentSettings = DefaultSettings;
    }

    let notifications = await engine.getFromStore<Notification[]>(NOTIFICATIONS_KEY);
    if(!notifications){
        notifications = []
    }

    const errorHanlderMiddleware = createThunkErrorHandlerMiddleware({ onError: errorHandler });
    const store = createStore<OptionsAppState, any, any, any>(rootReducer,
        {
            settings: currentSettings,
            userSummary: null,
            error: null,
            notifications
        },
        composeEnhancers(applyMiddleware(errorHanlderMiddleware, reduxThunk)));
    return store;
}

const muiTheme = createMuiTheme();

export interface OptionsProps {
    routerComponent: React.ComponentClass | React.FunctionComponent
}

export const OptionsApp = (props: OptionsProps) => {
    const [store, setStore] = useState<any>(null);
    const create = async () => {
        const store = await createAppStore();
        setStore(store);
    }

    useEffect(() => {
        create();
    }, [])

    if (!store) {
        return (<div>Creating store</div>);
    }

    return (
        <Provider store={store}>
            <MuiThemeProvider theme={muiTheme}>
                <ThemeProvider theme={muiTheme}>
                    <ErrorPage>
                        <SnackbarProvider maxSnack={3}>
                            {
                                    React.createElement(props.routerComponent, {}, (
                                        <Route path='/' component={Layout} />
                                    ))
                            }
                        </SnackbarProvider>   
                    </ErrorPage>          
                </ThemeProvider>
            </MuiThemeProvider>
        </Provider>
    )
}