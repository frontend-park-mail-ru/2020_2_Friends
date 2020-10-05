import { StoreModel } from '../model/storeModel.js';
import { StoreView } from '../view/storeView.js';
import { EventBus } from '../utils/eventBus.js'

export class StoreController {
    constructor (root) {
        const eventBus = new EventBus();

        this.model = new StoreModel(eventBus);
        this.view = new StoreView(root, eventBus);
    }
}
