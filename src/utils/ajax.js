export const ajaxGetUsingFetch = async (ajaxArgs) => {
    const response = await fetch(ajaxArgs.url, {
        method: 'GET',
        credentials: 'include'
    });
    const parsedJsonObject = await response.json();
    return {
        status: response.statusCode,
        responseObject: parsedJsonObject
    };
}

export const ajaxPostUsingFetch = async (ajaxArgs) => {
    const response = await fetch(ajaxArgs.url, {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(ajaxArgs.body)
    });
    const parsedJsonObject = await response.json();
    return {
        status: response.statusCode,
        responseObject: parsedJsonObject
    };
}
