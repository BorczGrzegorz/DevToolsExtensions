/// <reference types="chrome"/>
import React from 'react';
import ReactDOM from 'react-dom';
import { OptionsApp } from '../options/OptionsApp';
import { MemoryRouter } from 'react-router';

ReactDOM.render(<OptionsApp routerComponent={MemoryRouter}/>, document.getElementById('root'));       