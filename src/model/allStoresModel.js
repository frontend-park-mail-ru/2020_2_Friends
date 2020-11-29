import { getStores } from '../utils/ApiService.js';
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
        switch (response.status) {
        case 200: {
            const body = await response.json();
            body.forEach((store) => {
                store.picture = makeAvatarUrl(store.picture);
            });
            var placemarks = [
                {
                    latitude: 55.7894,
                    longitude: 37.7925,
                    hintContent: '%ресторан_нейм%',
                    distance: 5000,
                    id: 1488
                },
                {
                    latitude: 55.7678,
                    longitude: 37.6860,
                    hintContent: '%ресторан_нейм%',
                    distance: 3000
                },
                {
                    latitude: 55.7657,
                    longitude: 37.5942,
                    hintContent: '%ресторан_нейм%',
                    distance: 5000
                },
                {
                    latitude: 55.7207,
                    longitude: 37.7329,
                    hintContent: '%ресторан_нейм%',
                    distance: 2000
                }
            ];
            this.eventBus.call('SHOW_STORES', {
                stores: body,
                maps: placemarks
            });
            break;
        }
        default:
            console.log(`Uncaught backend http-status: ${response.status}`);
        }
    }
}
