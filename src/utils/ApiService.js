
import { ajaxGetUsingFetch, ajaxPostUsingFetch } from '../utils/ajax.js';

export const loginRequest = (input) => {
    const args = {
        url: 'http://89.208.197.247:9000/api/v1/sessions',
        body: input
    }
    return ajaxPostUsingFetch(args);
}

export const registerRequest = (input) => {
    const args = {
        url: 'http://89.208.197.247:9000/api/v1/users',
        body: input
    }
    return ajaxPostUsingFetch(args);
}

export const getStoreDataRequest = (id) => {
    const args = {
        url: `http://89.208.197.247:9000/api/v1/vendors/${id}`
    }
    return ajaxGetUsingFetch(args);
}

export const changePersonalInfoRequest = () => {
    return;
}

export const cookieRequest = () => {
    const args = {
        url: 'http://89.208.197.247:9000/api/v1/cookie'
    }
    return ajaxGetUsingFetch(args);
}
