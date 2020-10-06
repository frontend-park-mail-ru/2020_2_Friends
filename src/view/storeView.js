import { renderStoreView } from '../template/storeViewTemplate.js';

export class StoreView {
    constructor (root, eventBus) {
        this.root = root;
        this.eventBus = eventBus;
    }

    render = (data) => {
        const template = renderStoreView();
        const storeHTML = template(data);
        this.root.innerHTML = storeHTML;
    }
}
