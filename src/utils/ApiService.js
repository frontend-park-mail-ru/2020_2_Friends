
import { ajaxGetUsingFetch, ajaxPostUsingFetch, ajaxPutUsingFetch, ajaxMultipartUsingFetch } from '../utils/ajax.js';

// Servers configs
const schema = 'http://';
// const host = 'localhost';
const host = '89.208.197.247';
const backendPort = ':9000';
const staticPort = ':9001';

const backendUrl = schema + host + backendPort;
const staticUrl = schema + host + staticPort;

/**
 * Creating http login request via ajax methods.
 *
 * @param {object} input - Arguments that contains url and body for request.
 *
 * @return {object} - Response object.
 */
export const loginRequest = (input) => {
    const args = {
        url: backendUrl + '/api/v1/sessions',
        body: input
    }
    return ajaxPostUsingFetch(args);
}

/**
 * Creating http login request via ajax methods.
 *
 * @param {object} input - Arguments that contains url and body for request.
 *
 * @return {object} - Response object.
 */
export const registerRequest = (input) => {
    const args = {
        url: backendUrl + '/api/v1/users',
        body: input
    }
    return ajaxPostUsingFetch(args);
}

/**
 * Creating http login request via ajax methods.
 *
 * @param {object} id - Arguments that contains part of url for request.
 *
 * @return {object} - Response object.
 */
export const getStoreDataRequest = (id) => {
    const args = {
        url: backendUrl + `/api/v1/vendors/${id}`
    }
    return ajaxGetUsingFetch(args);
}

/**
 * Creating http profile request via ajax methods.
 *
 * @return {object} - Response object.
 */
export const getProfileInfoRequest = () => {
    const args = {
        url: backendUrl + '/api/v1/profiles'
    }
    return ajaxGetUsingFetch(args);
}

/**
 * Creating http update profile info request via ajax methods.
 *
 * @param {object} input - Arguments that contains url and body for request.
 *
 * @return {object} - Response object.
 */
export const changePersonalInfoRequest = (input) => {
    const args = {
        url: backendUrl + '/api/v1/profiles',
        body: input
    }
    return ajaxPutUsingFetch(args);
}

/**
 * Creating http upload avatar request via ajax methods.
 * Using multipart/form-data to send a picture.
 *
 * @param {object} formAvatar - Form-data for request.
 *
 * @return {object} - Response object.
 */
export const uploadAvatarRequest = (formAvatar) => {
    const args = {
        url: backendUrl + '/api/v1/profiles/avatars',
        body: formAvatar
    }
    return ajaxMultipartUsingFetch(args);
}

/**
 * Send http get avatar request via ajax methods.
 * Method was created to check is it possible to pull image from static server.
 *
 * @param {object} avatarName - Picture name for request.
 *
 * @return {object} - Response object.
 */
export const pullAvatarRequest = (avatarName) => {
    const args = {
        url: staticUrl + '/data/img/' + avatarName
    }
    return ajaxGetUsingFetch(args);
}
