import { PartnerRegisterModel } from '../model/partnerRegisterModel.js';
import { PartnerRegisterView } from '../view/partnerRegisterView.js';
import { EventBus } from '../utils/eventBus.js'

export class PartnerRegisterController {
    /**
     * Creating controller class for register entity.
     *
     * @param {object} baseElems - Main html div objects.
     * @param {router} router - An object that allows to route inside a site.
     */
    constructor (baseElems, router) {
        const eventBus = new EventBus();
        this.router = router

        this.model = new PartnerRegisterModel(eventBus);
        this.view = new PartnerRegisterView(baseElems, eventBus);

        eventBus.subscribe('REDIRECT_TO_PROFILE', () => this.router.redirect('partner_profile'));
        eventBus.subscribe('REDIRECT_TO_LOGIN', () => this.router.redirect('partners'));
    }
}
