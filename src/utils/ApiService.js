
import { ajaxGetUsingFetch, ajaxPostUsingFetch, ajaxPutUsingFetch, ajaxMultipartUsingFetch } from '../utils/ajax.js';

// Servers configs
const schema = 'http://';
const host = 'localhost';
const backendPort = ':9000';
const staticPort = ':9001';

const backendUrl = schema + host + backendPort;
const staticUrl = schema + host + staticPort;

// HTTP - requests methods
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

export const uploadAvatarRequest = (formAvatar) => {
    const args = {
        url: backendUrl + '/api/v1/profiles/avatars',
        body: formAvatar
    }
    return ajaxMultipartUsingFetch(args);
}

export const pullAvatarRequest = (avatarName) => {
    const args = {
        url: staticUrl + '/data/img/' + avatarName
    }
    return ajaxGetUsingFetch(args);
}
