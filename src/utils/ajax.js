export const ajaxGetUsingFetch = (ajaxArgs) => {
    return fetch(ajaxArgs.url, {
        method: 'GET',
        credentials: 'include'
    });
}

export const ajaxPostUsingFetch = (ajaxArgs) => {
    return fetch(ajaxArgs.url, {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(ajaxArgs.body)
    });
}

export const ajaxPutUsingFetch = (ajaxArgs) => {
    return fetch(ajaxArgs.url, {
        method: 'PUT',
        credentials: 'include',
        body: JSON.stringify(ajaxArgs.body)
    })
}

export const ajaxMultipartUsingFetch = (ajaxArgs) => {
    return fetch(ajaxArgs.url, {
        method: 'PUT',
        credentials: 'include',
        body: ajaxArgs.body
    })
}
