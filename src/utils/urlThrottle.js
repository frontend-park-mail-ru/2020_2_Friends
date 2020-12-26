import { url } from '../utils/config.js';

/**
 * Creating a full url to staticserver's pictures.
 *
 * @param {string} avatarName - Name of picture.
 *
 * @return {string} avatarUrl - Full url to picture on static server.
 */
export const makeAvatarUrl = (avatarName) => {
    const staticUrl = url;
    const avatarUrl = staticUrl + '/data/' + avatarName;
    return avatarUrl;
};
