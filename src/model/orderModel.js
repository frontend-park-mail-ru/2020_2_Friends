import { changeOrderStatusRequest, getStoreOrders } from '../utils/ApiService.js';
export class OrderModel {
    /**
     * Creating an OrderModel instance.
     *
     * @param {eventBus} eventBus - A container to exchange MVC interactions inside one MVC entity.
     */
    constructor (eventBus) {
        this.eventBus = eventBus;

        this.changeStatus = this.changeStatus.bind(this);

        eventBus.subscribe('CHANGE_STATUS', this.changeStatus);
    }

    async changeStatus (data) {
        const { status, orderId, vendorId } = data;
        const response = await changeOrderStatusRequest({ status: status, orderId: orderId, vendorId: vendorId });
        switch (response.status) {
        case 200: {
            break;
        }
        case 400:
            this.eventBus.call('STORE_DATA_ERROR');
            break;
        case 500:
            this.eventBus.call('SERVER_INTERNAL_ERROR');
            break;
        default:
            console.log(`Uncaught backend http-status: ${response.status}`);
        }
    }

    /**
     * Getting store orders http-request
     * @param {object} id store id
     */
    async getData (id) {
        const response = await getStoreOrders(id);
        switch (response.status) {
        case 200: {
            const body = await response.json();
            const fullBody = { storeId: id, storeName: body[0].vendor_name, body: body };
            this.eventBus.call('SHOW_ORDERS', fullBody);
            break;
        }
        case 400:
            this.eventBus.call('STORE_DATA_ERROR');
            break;
        case 500:
            this.eventBus.call('SERVER_INTERNAL_ERROR');
            break;
        default:
            console.log(`Uncaught backend http-status: ${response.status}`);
        }
    }
}
