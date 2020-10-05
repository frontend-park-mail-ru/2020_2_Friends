import { renderStoreView } from '../template/storeViewTemplate.js';
import { getStoreDataRequest } from '../utils/ApiService.js';

export class StoreView {
    constructor (root, eventBus) {
        this.root = root;
        this.eventBus = eventBus;
    }

    render () {
        const template = renderStoreView();

        const data = getStoreDataRequest(0);
        console.log(data);
        const loginHTML = template(data);

        this.root.innerHTML = loginHTML;
    }
}
