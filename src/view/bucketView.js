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
    }

    /**
     * Rendering bucket page and setting event listeners.
     */
    render () {
        const template = renderBucketView();

        this.root.innerHTML = template()
        this.addEventListeners();
    }

    addEventListeners () {

    }
}