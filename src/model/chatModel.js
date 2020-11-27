// import { getStoreChats } from '../utils/ApiService.js';
export class ChatModel {
    /**
     * Creating an ChatModel instance.
     *
     * @param {eventBus} eventBus - A container to exchange MVC interactions inside one MVC entity.
     */
    constructor (eventBus) {
        this.eventBus = eventBus;
    }

    /**
     * Getting store chats http-request
     * @param {object} id store id
     */
    async getData (id) {
        this.eventBus.call('SHOW_CHATS', { a: 1 });
    //     const response = await getStoreChats(id);
    //     switch (response.status) {
    //     case 200: {
    //         const body = await response.json();
    //         this.eventBus.call('SHOW_CHATS', body);
    //         break;
    //     }
    //     case 400:
    //         this.eventBus.call('STORE_DATA_ERROR');
    //         break;
    //     case 500:
    //         this.eventBus.call('SERVER_INTERNAL_ERROR');
    //         break;
    //     default:
    //         console.log(`Uncaught backend http-status: ${response.status}`);
    //     }
    }
}
