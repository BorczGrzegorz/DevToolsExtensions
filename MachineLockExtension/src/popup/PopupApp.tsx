import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import createThunkErrorHandlerMiddleware from 'redux-thunk-error-handler';
import reduxThunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { compose, createStore, applyMiddleware } from 'redux';
import { Grid } from '@material-ui/core';
import { Root } from './components/Root';
import { getEngine } from '../engine/engine';
import { Settings, SETTINGS_KEY } from '../models/Settings';
import { errorHandler } from './actions/actions';
import { rootReducer } from './reducers';
import { AppState } from './models/AppState';
import { ServerSetupPage } from './components/setup/ServerSetupPage';
import { DomainSetUpPage } from './components/setup/DomainSetUpPage';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const MainContainer = styled(Grid)`
  && {
    min-width: 225px;
    max-width: 225px;
    min-height: 500px;
    max-height: 500px;
  }
`;

const createAppStore = async () => {
  let lastSelectedProduct: string = '';
  const settings = await getEngine().getFromStore<Settings | null>(SETTINGS_KEY);
  if (settings && settings.lastSelectedProduct) {
    lastSelectedProduct = settings.lastSelectedProduct;
  }

  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const errorHanlderMiddleware = createThunkErrorHandlerMiddleware({ onError: errorHandler });
  const store = createStore<AppState, any, any, any>(
    rootReducer,
    {
      lastSelectedProject: lastSelectedProduct,
      machines: {},
      users: {},
      products: {},
      currentUser: null,
      error: null,
    },
    composeEnhancers(applyMiddleware(errorHanlderMiddleware, reduxThunk))
  );

  return store;
};

export interface PopupProps {
  routerComponent: React.ComponentClass | React.FunctionComponent;
}

export const PopupApp = ({ routerComponent }: PopupProps) => {
  const [store, setStore] = useState<any>(null);
  const create = async () => {
    const store = await createAppStore();
    setStore(store);
  };

  useEffect(() => {
    create();
  }, []);

  if (!store) {
    return <div>Creating store</div>;
  }

  return (
    <MainContainer container alignContent='flex-start'>
      <Provider store={store}>
        {React.createElement(
          routerComponent,
          {},
          <ServerSetupPage>
            <DomainSetUpPage>
              <Root />
            </DomainSetUpPage>
          </ServerSetupPage>
        )}
      </Provider>
    </MainContainer>
  );
};
