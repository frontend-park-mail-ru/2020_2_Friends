export const ajaxGetUsingFetch = async (ajaxArgs) => {
    const response = await fetch(ajaxArgs.url, {
        method: 'GET'
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
        body: JSON.stringify(ajaxArgs.body)
    });
    const parsedJsonObject = await response.json();

    return {
        status: response.statusCode,
        responseObject: parsedJsonObject
    };
}
