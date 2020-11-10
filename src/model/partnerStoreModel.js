import { getStoreByIdDataPartnerRequest, addProductToBucket } from '../utils/ApiService.js';

export class PartnerStoreModel {
    /**
     * Creating an PartnerStoreModel instance.
     *
     * @param {eventBus} eventBus - A container to exchange MVC interactions inside one MVC entity.
     */
    constructor (eventBus) {
        this.getData = this.getData.bind(this);
        this.addToCart = this.addToCart.bind(this);
        this.eventBus = eventBus;
        eventBus.subscribe('ADD_TO_CART', this.addToCart);
    };

    /**
     * Getting store data with http-request.
     */
    async getData () {
        const response = await getStoreByIdDataPartnerRequest(1);

        switch (response.status) {
        case 200: {
            const body = await response.json();
            this.eventBus.call('SHOW_STORE',
                {
                    storeName: body.store_name,
                    products: body.products
                });
            break;
        }
        case 400:
            this.eventBus.call('STORE_DATA_ERROR');
            break;
        case 500:
            this.eventBus.call('SERVER_INTERNAL_ERROR');
            break;
        default:
            console.log(`Uncaught backend http-status: ${response.status}`);
        }
    }

    async addToCart (productId) {
        const response = await addProductToBucket(productId);

        switch (response.status) {
        case 200:
            console.log('ADDED ' + productId);
            break;
        default:
            console.log(`Uncaught backend http-status: ${response.status}`);
        }
    };
}
