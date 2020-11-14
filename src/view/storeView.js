import { renderStoreView } from '../template/storeViewTemplate.js';
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
        console.log(data);
        const template = renderStoreView();
        const storeHTML = template(data);
        this.root.innerHTML = storeHTML;
        this.addEventListeners();
    }

    addEventListeners () {
        const buttons = this.root.querySelectorAll('.js-add-to-cart');
        buttons.forEach(element => {
            element.addEventListener('click', () => {
                this.eventBus.call('ADD_TO_CART', element.dataset.productId);
                element.innerHTML = 'Добавлено!';
            });
        });
    }
}
