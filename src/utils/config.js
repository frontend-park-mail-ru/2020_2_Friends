/* eslint-disable key-spacing */
// Servers configs
export const schema = 'https://';
export const host = 'grassnearhome.ru';
export const url = schema + host;

export const routes = {
    login:              '^/login/?$',
    register:           '^/register/?$',
    profile:            '^/profile/?$',
    orders:             '^/profile/orders?$',
    store:              '^/store/?$',
    app:                '^/?$',
    stores:             '^/stores/(?<id>\\d+)/?$',
    partnersStores:     '^/partners_stores/(?<id>\\d+)$',
    partnersOrders:     '^/partners_stores/(?<id>\\d+)/orders/?$',
    partnersChats:      '^/partners_stores/(?<id>\\d+)/chats/?$',
    partnersReviews:    '^/partners_stores/(?<id>\\d+)/reviews/?$',
    storesReviews:      '^/stores/(?<id>\\d+)/reviews/?$',
    bucket:             '^/bucket/?$',
    partnersLogin:      '^/partners_login/?$',
    partnersRegister:   '^/partners_register/?$',
    partnersProfile:    '^/partners_profile/?$',
    partnersStore:      '^/partners_store/?$'
};

export const mapKey = '7ab35b09-4d49-4cde-be3d-b9e4d1e1cead';
