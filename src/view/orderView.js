import orderTemplate from '../templates/orderTemplate.hbs';

export class OrderView {
    /**
     * Creating an OrderView instance.
     * Allows to show user page of his order and response correctly to user's interaction with page.
     *
     * @param {eventBus} eventBus - A container to exchange MVC interactions inside one MVC entity.
     * @param {object} root - Main html div object.
     */
    constructor (root, eventBus) {
        this.root = root;
        this.eventBus = eventBus;
        this.render = this.render.bind(this);
        this.setStatus = this.setStatus.bind(this);
        eventBus.subscribe('SHOW_ORDERS', this.render);
    }

    render (data) {
        const template = orderTemplate;
        this.root.innerHTML = template(data);
        this.addEventListeners();
        this.setStatus(data.orders);
    }

    setStatus (orders) {
        orders.forEach(order => {
            const e = document.getElementById(order.id);
            e.querySelector('.order-cart__status').value = order.status;
        });
    }

    addEventListeners () {
        const toStoreBtn = this.root.querySelector('.js-to-store-button');
        const storeId = document.getElementById('storeHeader').dataset.storeid;
        toStoreBtn.addEventListener('click', () => {
            this.eventBus.call('REDIRECT_TO_STORE_BY_ID', { storeId });
        });

        const storeHeader = this.root.querySelector('#storeHeader');
        const orderStatuses = this.root.querySelectorAll('.order-cart__status');
        orderStatuses.forEach(status => {
            status.addEventListener('change', () => {
                const orderId = status.parentNode.parentNode.dataset.orderid;
                this.eventBus.call('CHANGE_STATUS', { orderId: orderId, status: status.value, vendorId: storeHeader.dataset.storeid });
            });
        });
    }
}
