import { StoreModel } from '../model/storeModel.js';
import { StoreView } from '../view/storeView.js';
import { EventBus } from '../utils/eventBus.js'

export class StoreController {
    /**
     * Creating controller class for store entity.
     *
     * @param {object} baseElems - Main html div objects.
     * @param {router} router - An object that allows to route inside a site.
     */
    constructor (baseElems, router) {
        const eventBus = new EventBus();
        this.router = router

        this.model = new StoreModel(eventBus);
        this.view = new StoreView(baseElems, eventBus);

        eventBus.subscribe('REDIRECT_TO_PROFILE', () => this.router.redirect('profile'));
        eventBus.subscribe('REDIRECT_TO_BUCKET', () => this.router.redirect('bucket'));
        eventBus.subscribe('REDIRECT_TO_LOGIN', () => this.router.redirect('login'));
    }
}
