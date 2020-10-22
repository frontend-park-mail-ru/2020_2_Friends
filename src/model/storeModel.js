import { getStoreDataRequest } from '../utils/ApiService.js';

export class StoreModel {
    /**
     * Creating an StoreModel instance.
     *
     * @param {eventBus} eventBus - A container to exchange MVC interactions inside one MVC entity.
     */
    constructor (eventBus) {
        this.getData = this.getData.bind(this);

        this.eventBus = eventBus;
    };

    /**
     * Getting store data with http-request.
     */
    async getData () {
        const response = await getStoreDataRequest(0);

        switch (response.status) {
        case 200: {
            const body = await response.json();
            this.eventBus.call('SHOW_STORE', { body: body });
            break;
        }
        default:
            console.log(`Uncaught backend http-status: ${response.status}`);
        }
    }
}
