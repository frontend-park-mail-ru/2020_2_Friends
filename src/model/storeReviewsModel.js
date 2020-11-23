import { makeAvatarUrl } from '../utils/urlThrottle.js';
import { getStoreReviewsRequest } from '../utils/ApiService.js';
export class StoreReviewsModel {
    /**
     * Creating an OrderModel instance.
     *
     * @param {eventBus} eventBus - A container to exchange MVC interactions inside one MVC entity.
     */
    constructor (eventBus) {
        this.eventBus = eventBus;
    }

    /**
     * Getting store orders http-request
     * @param {object} id store id
     */
    async getData (id) {
        const response = await getStoreReviewsRequest(id);
        switch (response.status) {
        case 200: {
            const body = await response.json();
            body.storeId = id;
            body.vendor_picture = makeAvatarUrl(body.vendor_picture);
            this.eventBus.call('SHOW_REVIEWS', body);
            break;
        }
        case 400:
            this.eventBus.call('REVIEWS_DATA_ERROR');
            break;
        case 500:
            this.eventBus.call('SERVER_INTERNAL_ERROR');
            break;
        default:
            console.log(`Uncaught backend http-status: ${response.status}`);
        }
    }
}
