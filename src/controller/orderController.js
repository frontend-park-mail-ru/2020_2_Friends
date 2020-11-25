import { OrderModel } from '../model/orderModel.js';
import { OrderView } from '../view/orderView.js';
import { EventBus } from '../utils/eventBus.js';

export class OrderController {
    /**
     * Creating controller class for header entity.
     *
     * @param {object} header - Main html div object.
     * @param {router} router - An object that allows to route inside a site.
     */
    constructor (header, router) {
        const eventBus = new EventBus();
        this.router = router;
        this.orderPageHandler = this.orderPageHandler.bind(this);

        this.model = new OrderModel(eventBus);
        this.view = new OrderView(header, eventBus);

        eventBus.subscribe('REDIRECT_TO_STORE_BY_ID', ({ storeId }) => this.router.redirect('partners_stores' + '/' + storeId));
    }

    /**
     * Handling order page rendering.
     *
     * @param {Number} id - Id of requesting order.
     */
    orderPageHandler ({ id }) {
        this.model.getData(id);
    }
}
