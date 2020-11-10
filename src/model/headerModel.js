import { logoutRequest } from '../utils/ApiService.js'
export class HeaderModel {
    /**
     * Creating an HeaderModel instance.
     *
     * @param {eventBus} eventBus - A container to exchange MVC interactions inside one MVC entity.
     */
    constructor (eventBus) {
        this.doLogout = this.doLogout.bind(this);
        this.eventBus = eventBus;
        eventBus.subscribe('LOGOUT', this.doLogout);
    }

    async doLogout () {
        const response = await logoutRequest();
        switch (response.status) {
        case 200:
            this.eventBus.call('REDIRECT_TO_LOGIN');
            break;
        default:
            console.log(`Uncaught backend http-status: ${response.status}`);
        }
    }
}
