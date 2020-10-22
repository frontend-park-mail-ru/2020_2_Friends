import { renderStoreView } from '../template/storeViewTemplate.js';

export class StoreView {
    /**
     * Creating an StoreView instance.
     * Allows to render store page and response correctly to user's interaction with page.
     *
     * @param {eventBus} eventBus - A container to exchange MVC interactions inside one MVC entity.
     * @param {object} root - Main html div object.
     */
    constructor (root, eventBus) {
        this.root = root;
        this.eventBus = eventBus;

        this.render = this.render.bind(this);
    }

    /**
     * Rendering register page and setting event listeners.
     */
    render (data) {
        const template = renderStoreView();
        const storeHTML = template(data);
        this.root.innerHTML = storeHTML;
    }
}
