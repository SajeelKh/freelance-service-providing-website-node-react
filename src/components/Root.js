import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Router, Route } from 'react-router-dom'
import { store } from '../helpers/store';
import { history } from '../helpers/history'
import App from './App';

const Store = store;

const Root = () => {
    return (
        <Provider store = {Store}>
            <Router history = {history}>
                <Route path="/" component={App} />
            </Router>
        </Provider>
    );
}

export default Root;