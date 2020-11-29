/**
 * Creating and sending http-request using fetch.
 * GET request.
 *
 * @param {object} ajaxArgs - Arguments for http-request.
 *
 * @return {Promise} - Response object.
 */
export const ajaxGetUsingFetch = (ajaxArgs) => {
    return fetch(ajaxArgs.url, {
        method: 'GET',
        credentials: 'include'
    });
};

/**
 * Creating and sending http-request using fetch.
 * DELETE request.
 *
 * @param {object} ajaxArgs - Arguments for http-request.
 *
 * @return {Promise} - Response object.
 */
export const ajaxDeleteUsingFetch = (ajaxArgs) => {
    return fetch(ajaxArgs.url, {
        method: 'DELETE',
        credentials: 'include'
    });
};

/**
 * Creating and sending http-request using fetch.
 * POST request.
 *
 * @param {object} ajaxArgs - Arguments for http-request.
 *
 * @return {Promise} - Response object.
 */
export const ajaxPostUsingFetch = (ajaxArgs) => {
    return fetch(ajaxArgs.url, {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(ajaxArgs.body)
    });
};

/**
 * Creating and sending http-request using fetch.
 * PUT request.
 *
 * @param {object} ajaxArgs - Arguments for http-request.
 *
 * @return {Promise} - Response object.
 */
export const ajaxPutUsingFetch = (ajaxArgs) => {
    return fetch(ajaxArgs.url, {
        method: 'PUT',
        credentials: 'include',
        body: JSON.stringify(ajaxArgs.body)
    });
};

/**
 * Creating and sending http-request using fetch.
 * Sending multipart/form-data body.
 * PUT request.
 *
 * @param {object} ajaxArgs - Arguments for http-request.
 *
 * @return {Promise} - Response object.
 */
export const ajaxMultipartUsingFetch = (ajaxArgs) => {
    return fetch(ajaxArgs.url, {
        method: 'PUT',
        credentials: 'include',
        body: ajaxArgs.body
    });
};
