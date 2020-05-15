import React from 'react';
import ReactDOM from 'react-dom';
import { PopupApp } from './popup/PopupApp';
import { BrowserRouter } from 'react-router-dom';
import { OptionsApp } from './options/OptionsApp';
import { setEngine, MemoryEngine } from './engine';

// IMPORTANT - ONLY FOR LOCAL TESTS!!!
setEngine(new MemoryEngine());

ReactDOM.render(<PopupApp routerComponent={BrowserRouter} />, document.getElementById('root'));

// ReactDOM.render(<OptionsApp routerComponent={BrowserRouter} />, document.getElementById('root'));
