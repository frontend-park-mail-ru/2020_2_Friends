import { PartnerRegisterModel } from '../model/partnerRegisterModel.js';
import { PartnerRegisterView } from '../view/partnerRegisterView.js';
import { EventBus } from '../utils/eventBus.js'

export class PartnerRegisterController {
    /**
     * Creating controller class for register entity.
     *
     * @param {object} root - Main html div object.
     * @param {router} router - An object that allows to route inside a site.
     */
    constructor (root, router) {
        const eventBus = new EventBus();
        this.router = router

        this.model = new PartnerRegisterModel(eventBus);
        this.view = new PartnerRegisterView(root, eventBus);

        eventBus.subscribe('REDIRECT_TO_PROFILE', () => this.router.redirect('partner_profile'));
        eventBus.subscribe('REDIRECT_TO_LOGIN', () => this.router.redirect('partners'));
    }
}
