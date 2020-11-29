// import { getStoreChats } from '../utils/ApiService.js';
import webSocket from '../utils/webSocket.js';
export class ChatModel {
    /**
     * Creating an ChatModel instance.
     *
     * @param {eventBus} eventBus - A container to exchange MVC interactions inside one MVC entity.
     */
    constructor (eventBus) {
        this.socket = webSocket;
        this.eventBus = eventBus;
        // this.socket.subscribe('message', this.newMessage.bind(this));
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
        const response = { status: 200 }; // await getStoreChats(id); // запрос на все чаты магазина
        switch (response.status) {
        case 200: {
            const body = [
                {
                    order_id: 10,
                    interlocutor_id: '7',
                    interlocutor_name: 'Temich',
                    last_message: 'where is the courier?'
                },
                {
                    order_id: 11,
                    interlocutor_id: '7',
                    interlocutor_name: 'Temich',
                    last_message: 'where is the courier?!!'
                }];
            // await response.json();
            this.eventBus.call('SHOW_CHAT_LIST', { storeId: id, chats: body });
            // cходить за последним чатом
            const lastId = body[0].order_id;
            const chatResponse = { status: 200 }; // await getChat(lastId);
            switch (chatResponse.status) {
            case 200: {
                this.getChatMessages(lastId);
                break;
            }
            default:
                console.log(`Uncaught backend http-status: ${response.status}`);
            }
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
        const response = { status: 200 }; // await getChat(lastId);
        switch (response.status) {
        case 200: {
            const messageBody = [
                {
                    user_id: '7',
                    text: 'Hello Server!',
                    sent_at: '28.11.2020 16:22:28'
                },
                {
                    user_id: '7',
                    text: 'Hello Server!',
                    sent_at: '28.11.2020 17:00:57'
                },
                {
                    user_id: '8',
                    text: 'Hello Server!',
                    sent_at: '28.11.2020 17:01:00'
                }
            ]; // await chatResponse.json();
            this.eventBus.call('SHOW_CHAT_MESSAGES', { order_id: id, messages: messageBody });
            break;
        }
        default:
            console.log(`Uncaught backend http-status: ${response.status}`);
        }
    }

    sendMessage (data) {
        console.log(data);
        this.eventBus.call('SHOW_MESSAGE_FROM_ME', data);
    }
}
