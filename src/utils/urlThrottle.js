/**
 * Creating a full url to staticserver's pictures.
 *
 * @param {string} avatarName - Name of picture.
 *
 * @return {string} avatarUrl - Full url to picture on static server.
 */
export const makeAvatarUrl = (avatarName) => {
    const schema = 'https://';
    const host = '89.208.197.247';
    // const host = 'localhost';
    const staticPort = ':9001';
    const staticUrl = schema + host + staticPort;

    const avatarUrl = staticUrl + '/data/img/' + avatarName;
    return avatarUrl;
};
