import { } from '../utils/ApiService.js';

export class AllStoresModel {
    /**
     * Creating an AllStores instance.
     *
     * @param {eventBus} eventBus - A container to exchange MVC interactions inside one MVC entity.
     */
    constructor (eventBus) {
        this.eventBus = eventBus;
        this.getBucketData = this.getBucketData.bind(this);
    }

    async getBucketData () {
        const response = await fetch; // TODO: await request();
        switch (response.status) {
        case 200: {
            const body = await response.json();
            this.eventBus.call('SHOW_CART', {
                products: body
            });
            break;
        }
        default:
            console.log(`Uncaught backend http-status: ${response.status}`);
        }
    }
}
