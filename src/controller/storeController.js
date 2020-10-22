import { StoreModel } from '../model/storeModel.js';
import { StoreView } from '../view/storeView.js';
import { EventBus } from '../utils/eventBus.js'

export class StoreController {
    /**
     * Creating controller class for store entity.
     *
     * @param {object} root - Main html div object.
     * @param {router} router - An object that allows to route inside a site.
     */
    constructor (root, router) {
        const eventBus = new EventBus();
        this.router = router

        this.model = new StoreModel(eventBus);
        this.view = new StoreView(root, eventBus);
    }
}
