import React from 'react';
import ReactDOM from 'react-dom';
import { PopupApp } from './../popup/PopupApp';
import { MemoryRouter } from 'react-router';

ReactDOM.render(<PopupApp routerComponent={MemoryRouter}/>, document.getElementById('root'));