import { renderStoreView } from '../template/storeViewTemplate.js';

export class StoreView {
    constructor (root, eventBus) {
        this.root = root;
        this.eventBus = eventBus;
        this.render = this.render.bind(this);
    }

    render = (data) => {
        const template = renderStoreView();
        const storeHTML = template(data);
        this.root.innerHTML = storeHTML;
    }
}
