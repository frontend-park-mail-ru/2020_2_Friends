import { getStoreByIdDataPartnerRequest, createProductRequest, changeProductImgRequest, changeProductRequest, deleteProductRequest, changeStoreImgRequest } from '../utils/ApiService.js';
import { makeAvatarUrl } from '../utils/urlThrottle.js';

export class PartnerStoreModel {
    /**
     * Creating an PartnerStoreModel instance.
     *
     * @param {eventBus} eventBus - A container to exchange MVC interactions inside one MVC entity.
     */
    constructor (eventBus) {
        this.getData = this.getData.bind(this);
        this.createProduct = this.createProduct.bind(this);
        this.changeProduct = this.changeProduct.bind(this);
        this.uploadLogo = this.uploadLogo.bind(this);
        this.eventBus = eventBus;
        eventBus.subscribe('CREATE_PRODUCT', this.createProduct);
        eventBus.subscribe('EDIT_PRODUCT', this.changeProduct);
        eventBus.subscribe('DELETE_PRODUCT', this.deleteProduct);
        eventBus.subscribe('UPLOAD_STORE_LOGO', this.uploadLogo);
    };

    /**
     * Getting store data with http-request.
     */
    async getData (id) {
        const response = await getStoreByIdDataPartnerRequest(id);

        switch (response.status) {
        case 200: {
            const body = await response.json();
            console.log(body);
            body.picture = makeAvatarUrl(body.picture);
            body.products.forEach((product) => {
                product.picture = makeAvatarUrl(product.picture);
            });
            this.eventBus.call('SHOW_STORE',
                {
                    storeName: body.store_name,
                    storeId: id,
                    products: body.products,
                    picture: body.picture
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
        if (this.validate({ foodPrice: input.food_price })) {
            const productInfo = { food_name: input.food_name, food_price: parseInt(input.food_price), id: input.store_id };
            const response = await createProductRequest(productInfo);
            switch (response.status) {
            case 200: {
                const body = await response.json();
                input.food_id = body.id;
                if (input.food_img) {
                    console.log(input.food_img);
                    this.changeProductImg(input);
                } else {
                    console.log('SHOW_NEW_PRODUCT');
                    this.eventBus.call('SHOW_NEW_PRODUCT', input);
                }
                break;
            }
            default:
                console.log(`Uncaught backend http-status: ${response.status}`);
            }
        }
    }

    async changeProduct (input) {
        if (this.validate({ foodPrice: input.food_price, foodId: input.food_id })) {
            const productInfo = { food_name: input.food_name, food_price: parseInt(input.food_price), food_id: input.food_id, store_id: input.store_id };
            const response = await changeProductRequest(productInfo);

            switch (response.status) {
            case 200: {
                if (input.food_img) {
                    this.changeExistingProductImg(input);
                } else {
                    this.eventBus.call('SHOW_CHANGED_PRODUCT', input);
                }
                break;
            }
            default:
                console.log(`Uncaught backend http-status: ${response.status}`);
            }
        }
    }

    async changeProductImg (input) {
        const response = await changeProductImgRequest({ food_id: input.food_id, store_id: input.store_id, food_img: input.food_img });
        switch (response.status) {
        case 200: {
            const avatar = await response.json();
            const avatarUrl = makeAvatarUrl(avatar.avatar);
            input.avatarUrl = avatarUrl;
            console.log('SHOW_NEW_PRODUCT');
            this.eventBus.call('SHOW_NEW_PRODUCT', input);
            break;
        }
        default:
            console.log(`Uncaught backend http-status: ${response.status}`);
        }
    }

    async changeExistingProductImg (input) {
        const response = await changeProductImgRequest({ food_id: input.food_id, store_id: input.store_id, food_img: input.food_img });
        switch (response.status) {
        case 200: {
            const avatar = await response.json();
            const avatarUrl = makeAvatarUrl(avatar.avatar);
            input.avatarUrl = avatarUrl;
            this.eventBus.call('SHOW_CHANGED_PRODUCT', input);
            break;
        }
        default:
            console.log(`Uncaught backend http-status: ${response.status}`);
        }
    }

    async deleteProduct (input) {
        const response = await deleteProductRequest(input);
        switch (response.status) {
        case 200: {
            break;
        }
        default:
            console.log(`Uncaught backend http-status: ${response.status}`);
        }
    }

    async uploadLogo (data) {
        const response = await changeStoreImgRequest(data);

        switch (response.status) {
        case 200: {
            const avatar = await response.json();
            const avatarUrl = makeAvatarUrl(avatar.avatar);
            this.eventBus.call('RENDER_LOGO', { avatarUrl });
            break;
        }
        case 400:
            this.eventBus.call('AVATAR_UPLOAD_ERROR');
            break;
        case 500:
            this.eventBus.call('SERVER_INTERNAL_ERROR');
            break;
        default:
            console.log(`Uncaught backend http-status: ${response.status}`);
        }
    }

    validate (input) {
        const { foodPrice, foodId } = input;
        let isValid = true;
        if (Number.isNaN(parseInt(foodPrice))) {
            this.eventBus.call('PRICE_NOT_VALID', foodId);
            isValid = false;
        }
        return isValid;
    }
}
