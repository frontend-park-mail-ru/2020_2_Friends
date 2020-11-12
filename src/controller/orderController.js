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

        this.model = new OrderModel(eventBus);
        this.view = new OrderView(header, eventBus);
    }
}
