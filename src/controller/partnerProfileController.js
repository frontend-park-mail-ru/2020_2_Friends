import { PartnerProfileModel } from '../model/partnerProfileModel.js';
import { PartnerProfileView } from '../view/partnerProfileView.js';
import { EventBus } from '../utils/eventBus.js'

export class PartnerProfileController {
    /**
     * Creating controller class for profile entity.
     *
     * @param {object} root - Main html div object.
     * @param {router} router - An object that allows to route inside a site.
     */
    constructor(root, router) {
        const eventBus = new EventBus();
        this.router = router

        this.model = new PartnerProfileModel(eventBus);
        this.view = new PartnerProfileView(root, eventBus);

        eventBus.subscribe('REDIRECT_TO_STORE', () => this.router.redirect('store'));
        eventBus.subscribe('REDIRECT_TO_ADD_STORE', () => this.router.redirect('partners_addstore'));
    }
}
