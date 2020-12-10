// import { storeReviewsView } from '../template/storeReviewsViewTeamplate.js';
import storeReviewsTemplate from '../templates/storeReviewsTemplate.hbs';
export class StoreReviewsView {
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
        this.render = this.render.bind(this);
        eventBus.subscribe('SHOW_REVIEWS', this.render);
    }

    render (data) {
        data.reviews.forEach((review) => {
            if (!review.username) {
                review.username = 'Аноним';
            }
        });
        const template = storeReviewsTemplate;
        this.root.innerHTML = template(data);
        this.addEventListeners();
    }

    addEventListeners () {
        const toStoreBtn = this.root.querySelector('.js-to-store-button');
        const storeId = toStoreBtn.dataset.storeid;
        toStoreBtn.addEventListener('click', () => {
            this.eventBus.call(localStorage.getItem('isAdmin') ? 'REDIRECT_TO_ADMIN_STORE_BY_ID' : 'REDIRECT_TO_STORE_BY_ID', { storeId });
        });
    }
}
