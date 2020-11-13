export class OrderModel {
    /**
     * Creating an OrderModel instance.
     *
     * @param {eventBus} eventBus - A container to exchange MVC interactions inside one MVC entity.
     */
    constructor (eventBus) {
        this.eventBus = eventBus;
    }

    /**
     * Getting store data with http-request.
     */
    async getData (id) {
        this.eventBus.call('SHOW_ORDERS',
            {
                storeId: id
            });
    }
}
