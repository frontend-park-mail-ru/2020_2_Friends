// import { json, urlencoded } from "express";

import { ajaxGetUsingFetch, ajaxPostUsingFetch } from '../utils/ajax.js';

export const loginRequest = (input) => {
    const args = {
        url: 'http://localhost:9000/',
        body: input
    }
    return ajaxPostUsingFetch(args);
}

export const getStoreDataRequest = (id) => {
    const args = {
        url: `http://localhost:9000/vendor/${id}/`
    }
    return ajaxGetUsingFetch(args);
}
