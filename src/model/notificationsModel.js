import webSocket from '../utils/Socket.js';
import { makeAvatarUrl } from '../utils/urlThrottle.js';
export class NotificationsModel {
    /**
     * Creating an NotificationsModel instance.
     *
     * @param {eventBus} eventBus - A container to exchange MVC interactions inside one MVC entity.
     */
    constructor (eventBus) {
        this.socket = webSocket;
        this.eventBus = eventBus;
        this.socket.subscribe('message', this.newNotification.bind(this));
    }

    newNotification (event) {
        const msg = JSON.parse(event.data);
        if (msg.type === 'status') {
            msg.vendor_picture = makeAvatarUrl(msg.vendor_picture);
            this.eventBus.call('SHOW_NOTIFICATION', msg);
            this.eventBus.call('HANDLE_ORDER_STATUS', msg);
        }
    }
}
