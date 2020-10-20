export const makeAvatarUrl = (avatarName) => {
    // Я блять должен это из конфига сервера получать сука а не руками писать нахуй бекендеры вы ебаные или создайте блять енвайромент переменную
    const schema = 'http://';
    const host = 'localhost';
    const staticPort = ':9001';
    const staticUrl = schema + host + staticPort;

    const avatarUrl = staticUrl + '/data/img/' + avatarName;
    return avatarUrl;
}
