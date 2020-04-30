import React from 'react';
import ReactDOM from 'react-dom';
import { PopupApp } from './popup/PopupApp';
import { MemoryEngine, setEngine } from './engine/engine';
import { BrowserRouter } from 'react-router-dom';
import { OptionsApp } from './options/OptionsApp';

// IMPORTANT - ONLY FOR LOCAL TESTS!!!

setEngine(new MemoryEngine());
// ReactDOM.render(<PopupApp routerComponent={BrowserRouter}/>, document.getElementById('root'));

ReactDOM.render(<OptionsApp />, document.getElementById('root'));
