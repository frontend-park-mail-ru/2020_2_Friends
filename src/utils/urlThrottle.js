export const makeAvatarUrl = (avatarName) => {
    const schema = 'http://';
    const host = 'localhost';
    const staticPort = ':9001';
    const staticUrl = schema + host + staticPort;

    const avatarUrl = staticUrl + '/data/img/' + avatarName;
    return avatarUrl;
}
