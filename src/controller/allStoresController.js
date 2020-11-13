import { AllStoresModel } from '../model/allStoresModel.js';
import { AllStoresView } from '../view/allStoresView.js';
import { EventBus } from '../utils/eventBus.js';

export class AllStoresController {
    /**
     * Creating controller class for allStores entity.
     *
     * @param {object} root - Main html div object.
     * @param {router} router - An object that allows to route inside a site.
     */
    constructor (root, router) {
        const eventBus = new EventBus();
        this.router = router;

        this.model = new AllStoresModel(eventBus);
        this.view = new AllStoresView(root, eventBus);

        eventBus.subscribe('REDIRECT_TO_STORE', ({ id }) => this.router.redirect('store' + '/' + id));
    }
}
