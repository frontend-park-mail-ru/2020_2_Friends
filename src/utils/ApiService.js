// import { json, urlencoded } from "express";

import { ajaxGetUsingFetch, ajaxPostUsingFetch } from '../utils/ajax.js';

export const loginRequest = (input) => {
    const args = {
        url: 'http://localhost:9000/api/v1/login',
        body: input
    }
    return ajaxPostUsingFetch(args);
}

export const registerRequest = (input) => {
    const args = {
        url: 'http://localhost:9000/api/v1/reg',
        body: input
    }
    return ajaxPostUsingFetch(args);
}

export const getStoreDataRequest = (id) => {
    const args = {
        url: `http://localhost:9000/api/v1/vendors/${id}`
    }
    return ajaxGetUsingFetch(args);
}

export const cookieRequest = () => {
    const args = {
        url: 'http://localhost:9000/api/v1/cookie'
    }
    return ajaxGetUsingFetch(args);
}
