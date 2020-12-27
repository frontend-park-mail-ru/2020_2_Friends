import { getStoreByIdDataRequest, addProductToBucket, getRecomendationsRequest } from '../utils/ApiService.js';
import { makeAvatarUrl } from '../utils/urlThrottle.js';
export class StoreModel {
    /**
     * Creating an StoreModel instance.
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
    async getData (id) {
        const response = await getStoreByIdDataRequest(id);

        switch (response.status) {
        case 200: {
            const body = await response.json();
            body.products.forEach((product) => {
                product.picture = makeAvatarUrl(product.picture);
            });
            const recResponse = await getRecomendationsRequest(id);
            switch (recResponse.status) {
            case 200: {
                const recommendations = await recResponse.json();
                recommendations.forEach((rec) => {
                    rec.picture = makeAvatarUrl(rec.picture);
                });

                this.eventBus.call('SHOW_STORE', {
                    storeName: body.store_name,
                    products: body.products,
                    storeId: id,
                    recommendations: recommendations,
                    categories: body.categories,
                    picture: makeAvatarUrl(body.picture),
                    body: body
                });
                break;
            }
            default:
                console.log(`Uncaught backend http-status: ${response.status}`);
            }
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

    addToCart (product) {
        product.count = 1;
        const productsJSON = localStorage.getItem('cart');
        if (productsJSON === null) {
            localStorage.setItem('cart', JSON.stringify([product]));
            return
        }

        const products = JSON.parse(productsJSON);
        if (products.some(p => p.id === product.id)){
            return
        }

        localStorage.setItem('cart', JSON.stringify([...products, product]));
    };
}
