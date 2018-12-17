import axios from 'axios';
import config from '../config.json';
import { authHeader } from '../helpers/auth-header';

function login(username, password) {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username,
            password,
        })
    }
    
    return fetch(`${config.url}/users/authenticate`, requestOptions)
        .then(user => user.json()).then(handleResponse).then((user) => {
            localStorage.setItem('user', JSON.stringify(user));
            return user;
        }).catch(err => {
            throw err;
        });
}

function logout() {
    return localStorage.removeItem('user');
}

function getAll() {
    const requestOptions = {
        method: 'POST',
        headers: {
            Authorization: authHeader()
        }
    }
    return window.fetch(`${config.url}/users`, requestOptions)
        .then(handleResponse)
        .catch(err => {
            throw err;
        });
}

function handleResponse(res) {
    console.log(res);
    if (res.status) {
        throw new Error(res.message);
    }
    else {
        return res;
    }
}

export const userServices = {
    login,
    logout,
    getAll,
};