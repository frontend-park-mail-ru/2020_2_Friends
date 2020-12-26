import storeTemplate from '../templates/storeTemplate.hbs';

import { MapAPI } from '../utils/mapAPI.js';

export class StoreView {
    /**
     * Creating an StoreView instance.
     * Allows to render store page and response correctly to user's interaction with page.
     *
     * @param {eventBus} eventBus - A container to exchange MVC interactions inside one MVC entity.
     * @param {object} root - Main html div object.
     */
    constructor (root, eventBus) {
        this.root = root;

        this.eventBus = eventBus;

        this.render = this.render.bind(this);
        this.storeDataError = this.storeDataError.bind(this);
        this.serverInternalError = this.serverInternalError.bind(this);

        eventBus.subscribe('SHOW_STORE', this.render);
        eventBus.subscribe('STORE_DATA_ERROR', this.storeDataError);
        eventBus.subscribe('SERVER_INTERNAL_ERROR', this.serverInternalError);
    }

    /**
     * Reacting to internal server error.
     */
    serverInternalError () {
        const serverErrors = this.root.querySelector('.js-store-errors');
        serverErrors.innerHTML = 'Упс! Сервер устал, подождите и попробуйте заново!';
    }

    /**
     * Reacting to failed getting store data.
     */
    storeDataError () {
        const storeErrors = this.root.querySelector('.js-store-errors');
        storeErrors.innerHTML = 'Произошла ошибка при загрузке данных магазина!';
    }

    /**
     * Rendering register page and setting event listeners.
     */
    render (data) {
        this.root.innerHTML = storeTemplate(data);
        const mapId = this.root.querySelector('#map');
        const newMap = new MapAPI({
            div: mapId,
            zoom: 11
        });
        newMap.showStore(data.body);
        newMap.addMyPosition();
        this.addEventListeners();
    }

    addEventListeners () {
        const buttons = this.root.querySelectorAll('.js-add-to-cart');
        buttons.forEach(element => {
            element.addEventListener('click', () => {
                const product = {
                    id: element.dataset.productId,
                    food_name: element.dataset.productName,
                    food_price: element.dataset.productPrice,
                    picture: element.dataset.productPicture,
                }
                this.eventBus.call('ADD_TO_CART', product);
                element.innerHTML = 'Добавлено!';
            });
        });

        const recommended = this.root.querySelectorAll('.js-goto-store');
        recommended.forEach(element => {
            element.addEventListener('click', () => {
                const storeId = element.dataset.id;
                this.eventBus.call('REDIRECT_TO_STORE_BY_ID', storeId);
            });
        });

        const reviews = this.root.querySelector('.js-goto-reviews');
        const storeId = document.getElementById('storeHeader').dataset.store_id;
        reviews.addEventListener('click', () => {
            this.eventBus.call('REDIRECT_TO_REVIEWS', storeId);
        });
    }
}
