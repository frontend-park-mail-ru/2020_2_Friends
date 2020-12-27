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
        this.createOrder = this.createOrder.bind(this);
        this.eventBus.subscribe('CREATE_ORDER', this.createOrder);
        this.eventBus.subscribe('DELETE_FROM_BUCKET', this.deleteFromBucket);
        this.eventBus.subscribe('CHANGE_COUNT', this.changeCount);
    }

    async getBucketData () {
        let products = JSON.parse(localStorage.getItem('cart'));
        if (products === null) {
            products = []
        }
        const total = products.reduce((a, b) => a + b.food_price * b.count, 0);
        this.eventBus.call('SHOW_CART', { total: total, products: products, addresses: null });
    }

    async createOrder (data) {
        const response = await createOrderRequest(data);
        switch (response.status) {
        case 200:
            this.eventBus.call('REDIRECT_TO_ORDERS');
            break;

        default:
            console.log(`Uncaught backend http-status: ${response.status}`);
        }
    }

    deleteFromBucket (productId) {
        let products = JSON.parse(localStorage.getItem('cart'));
        products = products.filter((product) => { return product.id != productId; });
        localStorage.setItem('cart', JSON.stringify(products));
    }

    changeCount (obj) {
        let products = JSON.parse(localStorage.getItem('cart'));
        const idx = products.findIndex((product => product.id == obj.productId));
        products[idx].count = obj.value;
        localStorage.setItem('cart', JSON.stringify(products));
    }
}
