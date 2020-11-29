import { logoutRequest, checkAuth } from '../utils/ApiService.js';
import webSocket from '../utils/Socket.js';
export class HeaderModel {
    /**
     * Creating an HeaderModel instance.
     *
     * @param {eventBus} eventBus - A container to exchange MVC interactions inside one MVC entity.
     */
    constructor (eventBus) {
        this.socket = webSocket;
        this.doLogout = this.doLogout.bind(this);
        this.eventBus = eventBus;
        eventBus.subscribe('LOGOUT', this.doLogout);
    }

    async getHeaderData (isAdmin) {
        const response = await checkAuth();
        switch (response.status) {
        case 200:
            this.eventBus.call('SHOW_HEADER', isAdmin ? 'admin' : 'user');
            break;
        case 401:
            this.eventBus.call('SHOW_HEADER', 'notAuth');
            break;
        default:
            console.log(`Uncaught backend http-status: ${response.status}`);
        }
    }

    async doLogout () {
        const response = await logoutRequest();
        switch (response.status) {
        case 200:
            this.socket.disconnect();
            this.eventBus.call('REDIRECT_TO_ALL_STORES');
            break;
        default:
            console.log(`Uncaught backend http-status: ${response.status}`);
        }
    }
}
