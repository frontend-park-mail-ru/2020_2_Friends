import { PartnerProfileModel } from '../model/partnerProfileModel.js';
import { PartnerProfileView } from '../view/partnerProfileView.js';
import { EventBus } from '../utils/eventBus.js'

export class PartnerProfileController {
    /**
     * Creating controller class for profile entity.
     *
     * @param {object} baseElems - Main html div objects.
     * @param {router} router - An object that allows to route inside a site.
     */
    constructor (baseElems, router) {
        const eventBus = new EventBus();
        this.router = router

        this.model = new PartnerProfileModel(eventBus);
        this.view = new PartnerProfileView(baseElems, eventBus);

        eventBus.subscribe('REDIRECT_TO_STORE', () => this.router.redirect('store'));
        eventBus.subscribe('REDIRECT_TO_PROFILE', () => this.router.redirect('partners_profile'));
    }
}
