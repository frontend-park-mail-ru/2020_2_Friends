import { getStoreChats, getAllMessages } from '../utils/ApiService.js';
import webSocket from '../utils/Socket.js';
export class ChatModel {
    /**
     * Creating an ChatModel instance.
     *
     * @param {eventBus} eventBus - A container to exchange MVC interactions inside one MVC entity.
     */
    constructor (eventBus) {
        this.socket = webSocket;
        this.eventBus = eventBus;
        this.socket.subscribe('message', this.newMessage.bind(this));
        this.getChatMessages = this.getChatMessages.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
        eventBus.subscribe('GET_CHAT_MESSAGES', this.getChatMessages);
        eventBus.subscribe('SEND_MESSAGE', this.sendMessage);
    }

    /**
     * Getting store chats http-request
     * @param {object} id store id
     */
    async getData (id) {
        const response = await getStoreChats(id);
        switch (response.status) {
        case 200: {
            const body = await response.json();
            this.eventBus.call('SHOW_CHAT_LIST', { storeId: id, chats: body });
            const lastId = body[0].order_id;
            this.getChatMessages(lastId);
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

    async getChatMessages (id) {
        const response = await getAllMessages(id);
        switch (response.status) {
        case 200: {
            const body = await response.json();
            this.eventBus.call('SHOW_CHAT_MESSAGES', { order_id: id, messages: body });
            break;
        }
        default:
            console.log(`Uncaught backend http-status: ${response.status}`);
        }
    }

    newMessage (event) {
        const msg = JSON.parse(event.data);
        console.log(msg);
        this.eventBus.call('SHOW_MESSAGE_TO_ME', msg);
    }

    sendMessage (data) {
        this.socket.send(data);
        this.eventBus.call('SHOW_MESSAGE_FROM_ME', data);
    }
}
