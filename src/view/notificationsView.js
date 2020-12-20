import notificationTemplate from '../templates/notificationTemplate.hbs';

export class NotificationsView {
    /**
     * Creating an  NotificationView instance.
     * Allows to show user page of his notification and response correctly to user's interaction with page.
     *
     * @param {eventBus} eventBus - A container to exchange MVC interactions inside one MVC entity.
     * @param {object} root - Main html div object.
     */
    constructor (eventBus) {
        this.notify = document.getElementById('notification-list');
        this.eventBus = eventBus;
        this.eventBus.subscribe('SHOW_NOTIFICATION', this.showNotification.bind(this));
        this.notificationEventListeners();
    }

    showNotification (data) {
        this.notify.insertAdjacentHTML('beforeend', notificationTemplate(data));
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
