import { getStores } from '../utils/ApiService.js';

export class AllStoresModel {
    /**
     * Creating an AllStores instance.
     *
     * @param {eventBus} eventBus - A container to exchange MVC interactions inside one MVC entity.
     */
    constructor (eventBus) {
        this.eventBus = eventBus;

        this.getStoresData = this.getStoresData.bind(this);
    }

    async getStoresData () {
        const response = await getStores();
        switch (response.status) {
        case 200: {
            const body = await response.json();
            this.eventBus.call('SHOW_STORES', {
                stores: body
            });
            break;
        }
        default:
            console.log(`Uncaught backend http-status: ${response.status}`);
        }
    }
}