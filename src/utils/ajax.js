export const ajaxGetUsingFetch = async (ajaxArgs) => {
    return await fetch(ajaxArgs.url, {
        method: 'GET',
        credentials: 'include'
    });
}

export const ajaxPostUsingFetch = async (ajaxArgs) => {
    return await fetch(ajaxArgs.url, {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(ajaxArgs.body)
    });
}

export const ajaxPutUsingFetch = async (ajaxArgs) => {
    return await fetch(ajaxArgs.url, {
        method: 'PUT',
        credentials: 'include',
        body: JSON.stringify(ajaxArgs.body)
    })
}
