import { getBucketRequest, createOrderRequest } from '../utils/ApiService.js';

export class BucketModel {
    /**
     * Creating an BucketModel instance.
     *
     * @param {eventBus} eventBus - A container to exchange MVC interactions inside one MVC entity.
     */
    constructor (eventBus) {
        this.eventBus = eventBus;
        this.getBucketData = this.getBucketData.bind(this);
        this.eventBus.subscribe('CREATE_ORDER', this.createOrder);
    }

    async getBucketData () {
        const response = await getBucketRequest();
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

    async createOrder (data) {
        const response = await createOrderRequest(data);
        switch (response.status) {
        case 200: {
            console.log('заказ создался');
            break;
        }
        default:
            console.log(`Uncaught backend http-status: ${response.status}`);
        }
    }
}
