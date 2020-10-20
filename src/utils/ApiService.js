
import { ajaxGetUsingFetch, ajaxPostUsingFetch, ajaxPutUsingFetch } from '../utils/ajax.js';

const schema = 'http://';
const host = 'localhost:9000';
const backendUrl = schema + host;

export const loginRequest = (input) => {
    const args = {
        url: backendUrl + '/api/v1/sessions',
        body: input
    }
    return ajaxPostUsingFetch(args);
}

export const registerRequest = (input) => {
    const args = {
        url: backendUrl + '/api/v1/users',
        body: input
    }
    return ajaxPostUsingFetch(args);
}

export const getStoreDataRequest = (id) => {
    const args = {
        url: backendUrl + `/api/v1/vendors/${id}`
    }
    return ajaxGetUsingFetch(args);
}

export const getProfileInfoRequest = () => {
    const args = {
        url: backendUrl + '/api/v1/profiles'
    }
    return ajaxGetUsingFetch(args);
}

export const changePersonalInfoRequest = (input) => {
    const args = {
        url: backendUrl + '/api/v1/profiles',
        body: input
    }
    return ajaxPutUsingFetch(args);
}
