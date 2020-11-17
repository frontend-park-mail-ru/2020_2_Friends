import { getBucketRequest, createOrderRequest, deleteProductFromBucket, getProfileInfoRequest } from '../utils/ApiService.js';
import { makeAvatarUrl } from '../utils/urlThrottle.js';
export class BucketModel {
    /**
     * Creating an BucketModel instance.
     *
     * @param {eventBus} eventBus - A container to exchange MVC interactions inside one MVC entity.
     */
    constructor (eventBus) {
        this.eventBus = eventBus;
        this.getBucketData = this.getBucketData.bind(this);
        this.deleteFromBucket = this.deleteFromBucket.bind(this);
        this.eventBus.subscribe('CREATE_ORDER', this.createOrder);
        this.eventBus.subscribe('DELETE_FROM_BUCKET', this.deleteFromBucket);
    }

    async getBucketData () {
        const response = await getBucketRequest();
        const infoResponse = await getProfileInfoRequest();
        switch (response.status) {
        case 200: {
            const body = await response.json();
            const info = await infoResponse.json();
            body.forEach((product) => {
                product.picture = makeAvatarUrl(product.picture);
            });
            const total = this.getTotal(body);
            this.eventBus.call('SHOW_CART',
                { total: total, products: body, addresses: info.addresses });
            break;
        }
        default:
            console.log(`Uncaught backend http-status: ${response.status}`);
        }
    }

    getTotal (body) {
        console.log(body);
        let sum = 0;
        body.forEach((product) => {
            console.log(product.food_price);
            sum += product.food_price;
        });
        return sum;
    }

    async createOrder (data) {
        const response = await createOrderRequest(data);
        switch (response.status) {
        case 200:
            break;

        default:
            console.log(`Uncaught backend http-status: ${response.status}`);
        }
    }

    async deleteFromBucket (productId) {
        const response = await deleteProductFromBucket(productId);
        switch (response.status) {
        case 200:
            break;
        default:
            console.log(`Uncaught backend http-status: ${response.status}`);
        }
    }
}
