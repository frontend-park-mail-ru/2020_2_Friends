import { getStores, getNearestStores } from '../utils/ApiService.js';
import { makeAvatarUrl } from '../utils/urlThrottle.js';

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
        const success = async position => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            const response = await getNearestStores(latitude, longitude);
            if (response.status === 200) {
                const body = await response.json();
                this.eventBus.call('SHOW_NEAREST_STORES', {
                    stores: body
                });
            }
        };
        navigator.geolocation.getCurrentPosition(success);

        switch (response.status) {
        case 200: {
            const body = await response.json();
            body.forEach((store) => {
                store.picture = makeAvatarUrl(store.picture);
            });
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
