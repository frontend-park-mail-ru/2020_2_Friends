import { renderBucketView } from '../template/bucketViewTemplate.js';

export class BucketView {
    /**
     * Creating an BucketView instance.
     * @param {eventBus} eventBus - A container to exchange MVC interactions inside one MVC entity.
     * @param {object} root - Main html div object.
     */
    constructor (root, eventBus) {
        this.root = root;
        this.eventBus = eventBus;

        this.render = this.render.bind(this);

        eventBus.subscribe('SHOW_CART', this.render);
    }

    /**
     * Rendering bucket page and setting event listeners.
     */
    render (data) {
        const template = renderBucketView();
        console.log(data.products);
        this.root.innerHTML = template(data);
        this.addEventListeners();
    }

    addEventListeners () {

    }
}
