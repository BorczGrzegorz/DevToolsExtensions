import React from 'react';
import styled from 'styled-components';
import reduxThunk from 'redux-thunk';
import { Grid } from '@material-ui/core';
import { Provider } from 'react-redux';
import { compose, createStore, applyMiddleware } from 'redux';
import { rootReducer } from './reducers';
import { LoadingPage } from './components/LoadingPage';
import createThunkErrorHandlerMiddleware from 'redux-thunk-error-handler';
import { errorHandler } from './actions/actions';
import { ServerSetupPage } from './components/setup/ServerSetupPage';
import { BacklogIdSetupPage } from './components/setup/BacklogIdSetupPage';
import { NotificationInfo } from './components/notification/NotificationInfo';
import { DomainSetUpPage } from './components/setup/DomainSetUpPage';

const MainContainer = styled(Grid)`
  && {
    min-width: 225px;
    max-width: 225px;
    min-height: 500px;
    max-height: 500px;
  }
`;

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const createAppStore = () => {
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const errorHanlderMiddleware = createThunkErrorHandlerMiddleware({ onError: errorHandler });
  const store = createStore(rootReducer, composeEnhancers(applyMiddleware(errorHanlderMiddleware, reduxThunk)));
  return store;
};

export interface PopupProps {
  routerComponent: React.ComponentClass | React.FunctionComponent;
}

export const PopupApp = (props: PopupProps) => {
  return (
    <Provider store={createAppStore()}>
      <MainContainer>
        {React.createElement(
          props.routerComponent,
          {},
          <ServerSetupPage>
            <DomainSetUpPage>
              <BacklogIdSetupPage>
                <NotificationInfo>
                  <LoadingPage />
                </NotificationInfo>
              </BacklogIdSetupPage>
            </DomainSetUpPage>
          </ServerSetupPage>
        )}
      </MainContainer>
    </Provider>
  );
};
