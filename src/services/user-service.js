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
        .then(handleResponse).then((user) => {
            localStorage.setItem('user', user);
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
    return window.fetch(`${config.url}/users/`, requestOptions)
        .then(handleResponse)
        .catch(err => {
            throw err;
        });
}

function handleResponse(res) {
    if (res.ok) {
        return res.data;
    }
    else {
        throw new Error('Internal Server Error');
    }
}

export const userServices = {
    login,
    logout,
    getAll,
};