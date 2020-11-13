import { getStoreOrdersDataRequest, changeOrderStatusRequest } from '../utils/ApiService.js';
export class OrderModel {
    /**
     * Creating an OrderModel instance.
     *
     * @param {eventBus} eventBus - A container to exchange MVC interactions inside one MVC entity.
     */
    constructor (eventBus) {
        this.eventBus = eventBus;
        eventBus.subscribe('CHANGE_STATUS', this.changeStatus);
    }

    async changeStatus (data) {
        const { orderStatus, orderId } = data;
        console.log(data);
        const response = await changeOrderStatusRequest({ orderStatus: orderStatus, orderId: orderId });
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
        const response = await getStoreOrdersDataRequest(id);
        const fakeResponse = {
            status: 200,
            body: {
                storeName: 'Название магазина',
                orders: [{
                    orderId: 1,
                    date: '22.04.1998',
                    orderStatus: 'Готовится',
                    address: 'Улица пушкина дом кукушкина',
                    orderItems: [{ productName: 'булочка', productPrice: '200 р' },
                        { productName: 'булочка', productPrice: '200 р' },
                        { productName: 'булочка', productPrice: '200 р' }],
                    orderTotal: '100 p'
                }, {
                    orderId: 2,
                    date: '22.04.1998',
                    orderStatus: 'Доставка',
                    address: 'Улица пушкина дом кукушкина',
                    orderItems: [{ productName: 'булочка', productPrice: '200 р' },
                        { productName: 'булочка', productPrice: '200 р' },
                        { productName: 'булочка', productPrice: '200 р' }],
                    orderTotal: '100 p'
                }]
            }
        };
        switch (fakeResponse.status) {
        case 200: {
            // const body = await response.json();
            this.eventBus.call('SHOW_ORDERS', fakeResponse.body);
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
