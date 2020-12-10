// import { renderBucketView } from '../template/bucketViewTemplate.js';
import bucketTemplate from '../templates/bucketTemplate.hbs';
export class BucketView {
    /**
     * Creating an BucketView instance.
     * @param {eventBus} eventBus - A container to exchange MVC interactions inside one MVC entity.
     * @param {object} root - Main html div object.
     */
    constructor (root, eventBus) {
        this.root = root;
        this.eventBus = eventBus;

        this.render = this.render.bind(this);
        this.createOrder = this.createOrder.bind(this);

        eventBus.subscribe('SHOW_CART', this.render);
    }

    /**
     * Rendering bucket page and setting event listeners.
     * @param {Array} data - Array of cart's items.
     */
    render (data) {
        const template = bucketTemplate;
        if (data.products.length === 0) {
            data.empty = 'Что-то тут пустовато... Добавьте блюда в корзину для заказа!';
        }
        this.root.innerHTML = template(data);
        this.addEventListeners();
    }

    createOrder () {
        const addrSelect = document.getElementById('js-address');
        const products = this.root.querySelectorAll('.bucket-item');
        const data = {
            products: [...products].map(product => parseInt(product.dataset.id)),
            address: addrSelect.value
        };
        data.products.forEach(id => {
            this.eventBus.call('DELETE_FROM_BUCKET', id);
        });

        this.eventBus.call('CREATE_ORDER', data);
    }

    addEventListeners () {
        const delItemBtn = this.root.querySelectorAll('.js-delete-item');
        delItemBtn.forEach(btn => {
            btn.addEventListener('click', () => {
                const item = btn.closest('.bucket-item');
                const productId = item.dataset.id;
                item.remove();
                this.eventBus.call('DELETE_FROM_BUCKET', productId);
            });
        });

        const orderButton = this.root.querySelector('.js-make-order');
        orderButton.addEventListener('click', () => {
            this.createOrder();
        });

        const back = this.root.querySelector('.back-to-shopping__button');
        back.addEventListener('click', () => {
            this.eventBus.call('REDIRECT_TO_STORES');
        });
    }
}
