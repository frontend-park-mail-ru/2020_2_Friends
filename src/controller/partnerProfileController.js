import { PartnerProfileModel } from '../model/partnerProfileModel.js';
import { PartnerProfileView } from '../view/partnerProfileView.js';
import { EventBus } from '../utils/eventBus.js';

export class PartnerProfileController {
    /**
     * Creating controller class for profile entity.
     *
     * @param {object} root - Main html div object.
     * @param {router} router - An object that allows to route inside a site.
     */
    constructor (root, router) {
        const eventBus = new EventBus();
        this.router = router;

        this.model = new PartnerProfileModel(eventBus);
        this.view = new PartnerProfileView(root, eventBus);

        eventBus.subscribe('REDIRECT_TO_STORE_BY_ID', (value) => this.router.redirect('/stores/' + value.id));
        eventBus.subscribe('REDIRECT_TO_STORE', () => this.router.redirect('store'));
        eventBus.subscribe('REDIRECT_TO_PROFILE', () => this.router.redirect('partners_profile'));
        eventBus.subscribe('REDIRECT_TO_LOGIN', () => this.router.redirect('partners'));
    }
}
