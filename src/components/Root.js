import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom'
import { store } from '../helpers/store';
import { history } from '../helpers/history'
import App from './App';

const Store = store;

const Root = () => {
    return (
        <Provider store = {Store}>
            <BrowserRouter>
                <Route path="/" component={App} />
            </BrowserRouter>
        </Provider>
    );
}

export default Root;