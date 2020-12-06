// import { renderAllStores } from '../template/allStoresViewTemplate.js';
import { MapAPI } from '../utils/mapAPI.js';

export class AllStoresView {
    /**
     * Creating an AllStoresView instance.
     * @param {eventBus} eventBus - A container to exchange MVC interactions inside one MVC entity.
     * @param {object} root - Main html div object.
     */
    constructor (root, eventBus) {
        this.root = root;
        this.eventBus = eventBus;

        this.render = this.render.bind(this);
        this.renderNearest = this.renderNearest.bind(this);

        eventBus.subscribe('SHOW_STORES', this.render);
        eventBus.subscribe('SHOW_NEAREST_STORES', this.renderNearest);
    }

    /**
     * Rendering bucket page and setting event listeners.
     * @param {Array} data - Array of cart's items.
     */
    render (data) {
        const template = renderAllStores();
        this.root.innerHTML = template({ stores: data.stores });
        const mapId = this.root.querySelector('#map');
        const newMap = new MapAPI({
            div: mapId,
            zoom: 11
        });
        newMap.showAllStores(data.stores);
        newMap.addMyPosition();
        this.addEventListeners();
    }

    /**
     * Rendering bucket page and setting event listeners.
     * @param {Array} data - Array of cart's items.
     */
    renderNearest (data) {
        const mapId = this.root.querySelector('#map');
        const newMap = new MapAPI({
            div: mapId,
            zoom: 11
        });
        newMap.showNearestStores(data.stores);
        newMap.addMyPosition();
    }

    addEventListeners () {
        const stores = this.root.querySelectorAll('.store__block');
        stores.forEach(element => {
            element.addEventListener('click', () => {
                this.eventBus.call('REDIRECT_TO_STORE', element.id);
            });
        });
    }
}
