import { StoreReviewsModel } from '../model/storeReviewsModel.js';
import { StoreReviewsView } from '../view/storeReviewsView.js';
import { EventBus } from '../utils/eventBus.js';

export class StoreReviewsController {
    /**
     * Creating controller class for register entity.
     *
     * @param {object} root - Main html div object.
     * @param {router} router - An object that allows to route inside a site.
     */
    constructor (root, router) {
        const eventBus = new EventBus();
        this.router = router;

        this.model = new StoreReviewsModel(eventBus);
        this.view = new StoreReviewsView(root, eventBus);

        eventBus.subscribe('REDIRECT_TO_STORE_BY_ID', ({ storeId }) => this.router.redirect('stores' + '/' + storeId));
        eventBus.subscribe('REDIRECT_TO_ADMIN_STORE_BY_ID', ({ storeId }) => this.router.redirect('partners_stores' + '/' + storeId));
    }

    /**
     * Handling order page rendering.
     *
     * @param {Number} id - Id of requesting order.
     */
    reviewsPageHandler ({ id }) {
        this.model.getData(id);
    }
}
