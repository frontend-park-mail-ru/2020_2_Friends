import notificationTemplate from '../templates/notificationTemplate.hbs';

export class NotificationsView {
    /**
     * Creating an  NotificationView instance.
     * Allows to show user page of his notification and response correctly to user's interaction with page.
     *
     * @param {eventBus} eventBus - A container to exchange MVC interactions inside one MVC entity.
     * @param {object} root - Main html div object.
     */
    constructor (root, eventBus) {
        this.notify = document.getElementById('notification-list');
        this.root = root;
        this.eventBus = eventBus;
        this.eventBus.subscribe('SHOW_NOTIFICATION', this.showNotification.bind(this));
        this.eventBus.subscribe('HANDLE_ORDER_STATUS', this.handleOrderStatus.bind(this));
        this.notificationEventListeners();
    }

    showNotification (data) {
        this.notify.insertAdjacentHTML('beforeend', notificationTemplate(data));
        // если мы на странице заказов - найти заказ и изменить статус
    }

    handleOrderStatus (data) {
        // найти карточку заказа с data.order_id order-column
        const orderColumn = this.root.querySelector('.order-column-profile');
        if (!orderColumn) {
            return;
        }
        const orderCart = orderColumn.querySelector('#order-' + data.order_id);
        const status = orderCart.querySelector('.order-cart__user-status');
        status.innerText = data.order_status;
        // кнопки
        // если новый статус - завершен - показать оценку заказа
        const chat = orderCart.querySelector('.js-open-support');
        const review = orderCart.querySelector('.js-review-button');
        switch (data.order_status) {
        case 'Завершён':
            review.style.display = 'block';
            chat.style.display = 'none';
            break;
        case '':
        case 'Новый': {
            review.style.display = 'none';
            chat.style.display = 'none';
            break;
        }
        default:
            review.style.display = 'none';
            chat.style.display = 'flex';
            break;
        }
    }

    notificationEventListeners () {
        this.notify.addEventListener('click', (e) => {
            if (e.target && e.target.classList.contains('notification__close')) {
                const notification = e.target.closest('.notification');
                notification.remove();
            }
            if (e.target && !e.target.classList.contains('notification__close')) {
                this.eventBus.call('REDIRECT_TO_PROFILE_ORDERS');
                const notification = e.target.closest('.notification');
                notification.remove();
            }
        });
    }
}
