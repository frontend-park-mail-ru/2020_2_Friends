export const ajaxGetUsingFetch = async (ajaxArgs) => {
    const response = await fetch(ajaxArgs.url, {
        method: 'GET',
        credentials: 'include'
    });
    return response;
}

export const ajaxPostUsingFetch = async (ajaxArgs) => {
    const response = await fetch(ajaxArgs.url, {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(ajaxArgs.body)
    });
    return response;
}

export const ajaxPutUsingFetch = async (ajaxArgs) => {
    const response = await fetch(ajaxArgs.url, {
        method: 'PUT',
        credentials: 'include',
        body: JSON.stringify(ajaxArgs.body)
    })
    return response;
}
