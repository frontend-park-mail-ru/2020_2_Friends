import { NotificationsModel } from '../model/notificationsModel.js';
import { NotificationsView } from '../view/notificationsView.js';
import { EventBus } from '../utils/eventBus.js';

export class NotificationsController {
    /**
     * Creating controller class for notifications entity.
     *
     * @param {object} header - Main html div object.
     * @param {router} router - An object that allows to route inside a site.
     */
    constructor (root, router) {
        const eventBus = new EventBus();
        this.router = router;
        this.model = new NotificationsModel(eventBus);
        this.view = new NotificationsView(root, eventBus);
        eventBus.subscribe('REDIRECT_TO_PROFILE_ORDERS', () => this.router.redirect('/profile/orders'));
    }
}
