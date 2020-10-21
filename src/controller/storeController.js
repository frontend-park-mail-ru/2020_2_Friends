import { StoreModel } from '../model/storeModel.js';
import { StoreView } from '../view/storeView.js';
import { EventBus } from '../utils/eventBus.js'

export class StoreController {
    constructor (root, router) {
        const eventBus = new EventBus();
        this.router = router

        this.model = new StoreModel(eventBus);
        this.view = new StoreView(root, eventBus);

        eventBus.subscribe('SHOW_STORE', this.view.render)
    }
}
