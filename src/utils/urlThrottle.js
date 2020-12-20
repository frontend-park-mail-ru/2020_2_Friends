/**
 * Creating a full url to staticserver's pictures.
 *
 * @param {string} avatarName - Name of picture.
 *
 * @return {string} avatarUrl - Full url to picture on static server.
 */
export const makeAvatarUrl = (avatarName) => {
    const schema = 'http://';
    const host = 'grassnearhome.ru';
    // const host = 'localhost';
    const staticUrl = schema + host;

    const avatarUrl = staticUrl + '/data/img/' + avatarName;
    return avatarUrl;
};
