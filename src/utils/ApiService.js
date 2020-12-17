
import { ajaxGetUsingFetch, ajaxPostUsingFetch, ajaxPutUsingFetch, ajaxMultipartUsingFetch, ajaxDeleteUsingFetch } from '../utils/ajax.js';

// Servers configs
const schema = 'https://';
const host = '89.208.197.247';
// const host = 'localhost';
const backendPort = ':9000';
const staticPort = ':9001';

const backendUrl = schema + host + backendPort;
const staticUrl = schema + host + staticPort;

/**
 * Creating http login request via ajax methods.
 *
 * @param {object} input - Arguments that contains url and body for request.
 *
 * @return {Promise} - Returning Promise, resolving with backend-response.
 */
export const loginRequest = (input) => {
    const args = {
        url: backendUrl + '/api/v1/sessions',
        body: input
    };
    return ajaxPostUsingFetch(args, true);
};

/**
 * Creating http logout request via ajax methods.
 *
 * @param {object} input - Arguments that contains url and body for request.
 *
 * @return {Promise} - Returning Promise, resolving with backend-response.
 */
export const logoutRequest = () => {
    const args = {
        url: backendUrl + '/api/v1/sessions'
    };
    return ajaxDeleteUsingFetch(args);
};

/**
 * Creating http register request via ajax methods.
 *
 * @param {object} input - Arguments that contains url and body for request.
 *
 * @return {Promise} - Returning Promise, resolving with backend-response.
 */
export const registerRequest = (input) => {
    const args = {
        url: backendUrl + '/api/v1/users',
        body: input
    };
    return ajaxPostUsingFetch(args, true);
};

/**
 * Creating http profile request via ajax methods.
 *
 * @return {Promise} - Returning Promise, resolving with backend-response.
 */
export const getProfileInfoRequest = () => {
    const args = {
        url: backendUrl + '/api/v1/profiles'
    };
    return ajaxGetUsingFetch(args);
};

/**
 * Creating http update profile info request via ajax methods.
 *
 * @param {object} input - Arguments that contains url and body for request.
 *
 * @return {Promise} - Returning Promise, resolving with backend-response.
 */
export const changePersonalInfoRequest = (input) => {
    const args = {
        url: backendUrl + '/api/v1/profiles',
        body: input
    };
    return ajaxPutUsingFetch(args);
};

export const changeAddressesRequest = (input) => {
    const args = {
        url: backendUrl + '/api/v1/profiles/addresses',
        body: input
    };
    return ajaxPutUsingFetch(args);
};

/**
 * Creating http upload avatar request via ajax methods.
 * Using multipart/form-data to send a picture.
 *
 * @param {object} formAvatar - Form-data for request.
 *
 * @return {Promise} - Returning Promise, resolving with backend-response.
 */
export const uploadAvatarRequest = (formAvatar) => {
    const args = {
        url: backendUrl + '/api/v1/profiles/avatars',
        body: formAvatar
    };
    return ajaxMultipartUsingFetch(args);
};

/**
 * Send http get avatar request via ajax methods.
 * Method was created to check is it possible to pull image from static server.
 *
 * @param {string} avatarName - Picture name for request.
 *
 * @return {Promise} - Returning Promise, resolving with backend-response.
 */
export const pullAvatarRequest = (avatarName) => {
    const args = {
        url: staticUrl + '/data/img/' + avatarName
    };
    return ajaxGetUsingFetch(args);
};

/**
 * Creating http bucket request via ajax methods.
 *
 * @return {Promise} - Returning Promise, resolving with backend-response.
 */
export const bucketRequest = () => {
};
/************************************
 *        PARTNER REQUESTS          *
 *                                  *
 ***********************************/

/**
 * Creating http partner login request via ajax methods.
 *
 * @param {object} input - Arguments that contains url and body for request.
 *
 * @return {Promise} - Returning Promise, resolving with backend-response.
 */
export const partnerLoginRequest = (input) => {
    const args = {
        url: backendUrl + '/api/v1/sessions',
        body: input
    };
    return ajaxPostUsingFetch(args, true);
};

/**
 * Creating http partner register request via ajax methods.
 *
 * @param {object} input - Arguments that contains url and body for request.
 *
 * @return {Promise} - Returning Promise, resolving with backend-response.
 */
export const partnerRegisterRequest = (input) => {
    const args = {
        url: backendUrl + '/api/v1/partners',
        body: input
    };
    return ajaxPostUsingFetch(args, true);
};

/**
 * Creating http store request via ajax methods.
 *
 * @param {string} id - Arguments that contains part of url for request.
 *
 * @return {Promise} - Returning Promise, resolving with backend-response.
 */
export const getStoreByIdDataRequest = (id) => {
    const args = {
        url: backendUrl + `/api/v1/vendors/${id}`
    };
    return ajaxGetUsingFetch(args);
};

/**
 * Creating http partner profile request via ajax methods.
 *
 * @return {Promise} - Returning Promise, resolving with backend-response.
 */
export const getPartnerProfileInfoRequest = () => {
    const args = {
        url: backendUrl + '/api/v1/profiles'
    };
    return ajaxGetUsingFetch(args);
};

/**
 * Creating http update partner profile info request via ajax methods.
 *
 * @param {object} input - Arguments that contains url and body for request.
 *
 * @return {Promise} - Returning Promise, resolving with backend-response.
 */
export const changePartnerPersonalInfoRequest = (input) => {
    const args = {
        url: backendUrl + '/api/v1/profiles',
        body: input
    };
    return ajaxPutUsingFetch(args);
};

export const createProductRequest = (input) => {
    const productInfo = { food_name: input.food_name, food_price: input.food_price };
    const args = {
        url: backendUrl + `/api/v1/vendors/${input.id}/products`,
        body: productInfo
    };
    return ajaxPostUsingFetch(args);
};

export const getPartnersStoresRequest = () => {
    const args = {
        url: backendUrl + '/api/v1/partners/vendors'
    };
    return ajaxGetUsingFetch(args);
};

export const changeProductRequest = (input) => {
    const args = {
        url: backendUrl + `/api/v1/vendors/${input.store_id}/products/${input.food_id}`,
        body: input
    };
    return ajaxPutUsingFetch(args);
};

export const deleteProductRequest = (input) => {
    const args = {
        url: backendUrl + `/api/v1/vendors/${input.store_id}/products/${input.product_id}`,
        body: input
    };
    return ajaxDeleteUsingFetch(args);
};

export const changeProductImgRequest = (input) => {
    const args = {
        url: backendUrl + `/api/v1/vendors/${input.store_id}/products/${input.food_id}/pictures`,
        body: input.food_img
    };
    return ajaxMultipartUsingFetch(args);
};

export const changeStoreImgRequest = (input) => {
    const args = {
        url: backendUrl + `/api/v1/vendors/${input.storeId}/pictures`,
        body: input.avatar
    };
    return ajaxMultipartUsingFetch(args);
};

/**
 * Creating http upload avatar request for partner via ajax methods.
 * Using multipart/form-data to send a picture.
 *
 * @param {object} formAvatar - Form-data for request.
 *
 * @return {Promise} - Returning Promise, resolving with backend-response.
 */
export const uploadPartnerAvatarRequest = (formAvatar) => {
    const args = {
        url: backendUrl + '/api/v1/profiles/avatars',
        body: formAvatar
    };
    return ajaxMultipartUsingFetch(args);
};

/**
 * Send http get avatar request for partner via ajax methods.
 * Method was created to check is it possible to pull image from static server.
 *
 * @param {string} avatarName - Picture name for request.
 *
 * @return {Promise} - Returning Promise, resolving with backend-response.
 */
export const pullPartnerAvatarRequest = (avatarName) => {
    const args = {
        url: staticUrl + `/api/v1/data/img/${avatarName}`
    };
    return ajaxGetUsingFetch(args);
};

/**
 * Creating http get bucket request via ajax methods.
 *
 * @return {Promise} - Returning Promise, resolving with backend-response.
 */
export const getBucketRequest = () => {
    const args = {
        url: backendUrl + '/api/v1/carts'
    };
    return ajaxGetUsingFetch(args);
};

/**
 * Creating http add to bucket request via ajax methods.
 *  @param {string} productId - Id of new item in bucket.
 *
 * @return {Promise} - Returning Promise, resolving with backend-response.
 */
export const addProductToBucket = (productId) => {
    const args = {
        url: backendUrl + '/api/v1/carts' + '?product_id=' + productId
    };
    return ajaxPutUsingFetch(args);
};

export const deleteProductFromBucket = (productId) => {
    const args = {
        url: backendUrl + `/api/v1/carts?product_id=${productId}`
    };
    return ajaxDeleteUsingFetch(args);
};

export const addStore = (data) => {
    const args = {
        url: backendUrl + '/api/v1/vendors',
        body: data
    };
    return ajaxPostUsingFetch(args);
};

/**
 * Creating http store request for store's owner via ajax methods.
 *
 * @param {string} id - Arguments that contains part of url for request.
 *
 * @return {Promise} - Returning Promise, resolving with backend-response.
 */
export const getStoreByIdDataPartnerRequest = (id) => {
    const args = {
        url: backendUrl + `/api/v1/vendors/${id}`
    };
    return ajaxGetUsingFetch(args);
};

export const getStores = () => {
    const args = {
        url: backendUrl + '/api/v1/vendors'
    };
    return ajaxGetUsingFetch(args);
};
export const getUserOrdersDataRequest = () => {
    const args = {
        url: backendUrl + '/api/v1/orders'
    };
    return ajaxGetUsingFetch(args);
};

export const changeOrderStatusRequest = (data) => {
    const args = {
        url: backendUrl + `/api/v1/vendors/${data.vendorId}/orders/${data.orderId}`,
        body: { status: data.status }
    };
    return ajaxPutUsingFetch(args);
};

export const getStoreOrders = (id) => {
    const args = {
        url: backendUrl + `/api/v1/vendors/${id}/orders`
    };
    return ajaxGetUsingFetch(args);
};

export const getOrder = (data) => {
    const args = {
        url: backendUrl + `/api/v1/orders/${data.id}`
    };
    return ajaxGetUsingFetch(args);
};

export const createOrderRequest = (data) => {
    const args = {
        url: backendUrl + '/api/v1/orders',
        body: data
    };
    return ajaxPostUsingFetch(args);
};

export const getStoreReviewsRequest = (id) => {
    const args = {
        url: backendUrl + `/api/v1/vendors/${id}/reviews`
    };
    return ajaxGetUsingFetch(args);
};

export const createReviewRequest = (data) => {
    const args = {
        url: backendUrl + '/api/v1/reviews',
        body: data
    };
    return ajaxPostUsingFetch(args);
};

export const checkAuth = () => {
    const args = {
        url: backendUrl + '/api/v1/sessions'
    };
    return ajaxGetUsingFetch(args);
};

/**
 * Getting list of all store chats
 * @param {string} id - store id
 */
export const getStoreChats = (id) => {
    const args = {
        url: backendUrl + `/api/v1/vendors/${id}/chats`
    };
    return ajaxGetUsingFetch(args);
};

/**
 * Getting all messages from chat
 * @param {string} id - id of order whose chat we want to get
 */
export const getAllMessages = (id) => {
    const args = {
        url: backendUrl + `/api/v1/chats/${id}`
    };
    return ajaxGetUsingFetch(args);
};

export const getNearestStores = (latitude, longitude) => {
    const args = {
        url: backendUrl + '/api/v1/vendors/nearest' + `?longitude=${longitude}&latitude=${latitude}`
    };
    return ajaxGetUsingFetch(args);
};
