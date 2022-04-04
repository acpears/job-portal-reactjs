import axios from 'axios';
import config from 'config';
import { BehaviorSubject } from 'rxjs';
import { authHeader } from '@/helpers';

const authenticatedUser = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser')))

export const authenticationService = {
    register,
    login,
    logout,
    verifyAuthentication,
    requestAuthorizedData,
    authenticatedUser: authenticatedUser.asObservable(),
    get currentAuthenticatedUser() {
        return authenticatedUser.value
    }

};

function register(user) {
    const requestOptions = {
        baseURL: process.env.API_BASEURL,
        url: 'user/register',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        data: JSON.stringify(user)
    };
    return axios.request(requestOptions).then((res) => {
        console.log(res.data);
        return res.data
    }).catch((err) => {
        if (!err.response) {
            return Promise.reject("Server error");
        }
        return Promise.reject(err.response.data.error)
    });
}

function login(type, email, password) {
    const requestOptions = {
        baseURL: process.env.API_BASEURL,
        url: 'user/login',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        data: JSON.stringify({ type, email, password })
    };

    return axios.request(requestOptions).then((res) => {
        localStorage.setItem('currentUser', JSON.stringify(res.data));
        authenticatedUser.next(res.data)

        return res.data
    }).catch((err) => {
        if (!err.response) {
            return Promise.reject("Server error");
        }
        return Promise.reject(err.response.data.error)
    });
}

function logout() {
    localStorage.removeItem('currentUser');
    authenticatedUser.next(null);
}

function verifyAuthentication() {
    if (!authenticatedUser.value) {
        return Promise.resolve(false);
    }

    const requestOptions = {
        baseURL: process.env.API_BASEURL,
        url: '/authorization',
        method: 'POST',
        headers: authHeader()
    };

    return axios.request(requestOptions).then((res) => {
        return true;
    }).catch((err) => {
        logout();
        return false;
    });

}

function requestAuthorizedData(path) {
    const requestOptions = {
        baseURL: process.env.API_BASEURL,
        url: path,
        method: 'POST',
        headers: authHeader()
    };

    return axios.request(requestOptions).then((res) => {
        return res.data;
    }).catch((err) => {
        return null;
    });
}


