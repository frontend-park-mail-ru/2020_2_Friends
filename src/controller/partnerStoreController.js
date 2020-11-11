import { PartnerStoreModel } from '../model/partnerStoreModel.js';
import { PartnerStoreView } from '../view/partnerStoreView.js';
import { EventBus } from '../utils/eventBus.js';

export class PartnerStoreController {
    /**
     * Creating controller class for store entity.
     *
     * @param {object} root - Main html div object.
     * @param {router} router - An object that allows to route inside a site.
     */
    constructor (root, router) {
        const eventBus = new EventBus();
        this.router = router;

        this.model = new PartnerStoreModel(eventBus);
        this.view = new PartnerStoreView(root, eventBus);

        eventBus.subscribe('REDIRECT_TO_PROFILE', () => this.router.redirect('partners_profile'));
        eventBus.subscribe('REDIRECT_TO_LOGIN', () => this.router.redirect('partners'));
    }
}
