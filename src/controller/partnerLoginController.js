import { PartnerLoginModel } from '../model/partnerLoginModel.js';
import { PartnerLoginView } from '../view/partnerLoginView.js';
import { EventBus } from '../utils/eventBus.js';

export class PartnerLoginController {
    /**
     * Creating controller class for login entity.
     *
     * @param {object} root - Main html div object.
     * @param {router} router - An object that allows to route inside a site.
     */
    constructor (root, router) {
        const eventBus = new EventBus();
        this.router = router;

        this.model = new PartnerLoginModel(eventBus);
        this.view = new PartnerLoginView(root, eventBus);

        eventBus.subscribe('REDIRECT_TO_REG', () => this.router.redirect('partners_register'));
        eventBus.subscribe('REDIRECT_TO_PROFILE', () => this.router.redirect('partners_profile'));
        eventBus.subscribe('REDIRECT_TO_ALL_STORES', () => this.router.redirect('/'));
    }
}
