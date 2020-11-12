import { renderOrderView } from '../template/orderViewTemplate.js';
export class OrderView {
    /**
     * Creating an OrderView instance.
     * Allows to show user page of his order and response correctly to user's interaction with page.
     *
     * @param {eventBus} eventBus - A container to exchange MVC interactions inside one MVC entity.
     * @param {object} root - Main html div object.
     */
    constructor (root, eventBus) {
        this.root = root;
        this.eventBus = eventBus;
    }

    render () {
        const template = renderOrderView();
        this.root.innerHTML = template();
    }
}
