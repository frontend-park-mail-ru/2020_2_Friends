import { getStoreDataRequest } from '../utils/ApiService.js';

export class StoreModel {
    constructor (eventBus) {
        this.eventBus = eventBus;
        this.getData = this.getData.bind(this);
    };

    async getData () {
        const response = await getStoreDataRequest(0);
        console.log(response);
        this.eventBus.call('SHOW_STORE', response.responseObject);
        // storeController.view.render(response.responseObject);
        // вот тут нужно сделать проверку, что статус 200, потом прочитать бади, взять из него json и
        // сделать так: this.eventBus.call('SHOW_STORE', data)
    }
}
