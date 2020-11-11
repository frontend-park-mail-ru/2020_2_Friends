import { getStoreByIdDataPartnerRequest, createProductRequest, changeProductImgRequest, changeProductRequest } from '../utils/ApiService.js';

export class PartnerStoreModel {
    /**
     * Creating an PartnerStoreModel instance.
     *
     * @param {eventBus} eventBus - A container to exchange MVC interactions inside one MVC entity.
     */
    constructor (eventBus) {
        this.getData = this.getData.bind(this);
        this.eventBus = eventBus;
        eventBus.subscribe('CREATE_PRODUCT', this.createProduct);
        eventBus.subscribe('EDIT_PRODUCT', this.changeProduct);
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

    async createProduct (input) {
        const productInfo = { food_name: input.name, food_price: input.price };
        const response = await createProductRequest(productInfo);

        switch (response.status) {
        case 200: {
            const body = await response.json();
            // достать из боди id
            console.log('создать продукт удалось');
            this.changeProductImg({ food_id: body.id, food_img: input.img });
            break;
        }
        default:
            console.log('создать продукт не удалось');
            console.log(`Uncaught backend http-status: ${response.status}`);
        }
    }

    async changeProduct (input) {
        const productInfo = { food_name: input.name, food_price: input.price, food_id: input.id };
        const response = await changeProductRequest(productInfo);

        switch (response.status) {
        case 200: {
            console.log('изменить продукт удалось');
            if (input.img) {
                this.changeProductImg(input);
            }
            break;
        }
        default:
            console.log('изменить продукт не удалось');
            console.log(`Uncaught backend http-status: ${response.status}`);
        }
    }

    async changeProductImg (input) {
        const response = await changeProductImgRequest({ food_id: input.id, food_img: input.img });
        switch (response.status) {
        case 200: {
            // const body = await response.json();
            this.eventBus.call('SHOW_NEW_PRODUCT', input);
            break;
        }
        default:
            console.log(`Uncaught backend http-status: ${response.status}`);
        }
    }
}
