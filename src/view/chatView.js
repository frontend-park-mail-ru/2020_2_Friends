import { chatView, messageToUserView, messageFromUserView } from '../template/chatViewTemplate.js';
export class ChatView {
    /**
     * Creating an  ChatView instance.
     * Allows to show user page of his chat and response correctly to user's interaction with page.
     *
     * @param {eventBus} eventBus - A container to exchange MVC interactions inside one MVC entity.
     * @param {object} root - Main html div object.
     */
    constructor (root, eventBus) {
        this.root = root;
        this.eventBus = eventBus;
        this.showChatList = this.showChatList.bind(this);
        this.showChatMessages = this.showChatMessages.bind(this);
        this.showMessageFromMe = this.showMessageFromMe.bind(this);
        this.showMessageToMe = this.showMessageToMe.bind(this);
        // админ
        eventBus.subscribe('SHOW_CHAT_LIST', this.showChatList);
        eventBus.subscribe('SHOW_CHAT_MESSAGES', this.showChatMessages);
        eventBus.subscribe('SHOW_MESSAGE_FROM_ME', this.showMessageFromMe);
        // юзер
        eventBus.subscribe('SHOW_USER_CHATS', this.renderUserChat);
    }

    showChatList (data) {
        const template = chatView();
        this.root.innerHTML = template(data);
        this.addEventListeners();
    }

    showChatMessages (data) {
        const myId = '8';
        const toUserTemplate = messageToUserView();
        const fromUserTemplate = messageFromUserView();

        // сделать чат в списке выделенным (если он есть) и показать все сообщения в чате
        const chatMessages = this.root.querySelector('.chat-messages');
        chatMessages.innerHTML = '';
        data.messages.forEach((message) => {
            if (message.user_id === myId) {
                chatMessages.innerHTML += fromUserTemplate(message);
            } else {
                chatMessages.innerHTML += toUserTemplate(message);
            }
        });
        const lastChat = this.root.querySelector('.chats-item__open');
        if (lastChat) {
            lastChat.classList.toggle('chats-item__open');
        }
        const activeChat = document.getElementById('chat-' + data.order_id);
        if (activeChat) {
            activeChat.classList.toggle('chats-item__open');
            const newMessage = this.root.querySelector('.js-new-message');
            newMessage.dataset.id = data.order_id;
        }
    }

    showMessageFromMe (data) {
        const chatMessages = this.root.querySelector('.chat-messages');
        const fromUserTemplate = messageFromUserView();
        chatMessages.innerHTML += fromUserTemplate(data);
    }

    showMessageToMe (data) {
        const chatMessages = this.root.querySelector('.chat-messages');
        if (chatMessages) {
            const toUserTemplate = messageToUserView();
            chatMessages.innerHTML += toUserTemplate(data);
        }
    }

    addEventListeners () {
        const toStoreBtn = this.root.querySelector('.js-to-store-button');
        const storeId = document.getElementById('storeHeader').dataset.storeid;
        toStoreBtn.addEventListener('click', () => {
            this.eventBus.call('REDIRECT_TO_STORE_BY_ID', { storeId });
        });

        const newMessage = this.root.querySelector('.js-new-message');
        newMessage.addEventListener('click', () => {
            const text = this.root.querySelector('.js-message-input').value;
            this.root.querySelector('.js-message-input').value = '';
            if (text) {
                this.eventBus.call('SEND_MESSAGE', { order_id: newMessage.dataset.id, text: text });
            }
        });

        const chats = this.root.querySelectorAll('.chats-item');
        chats.forEach((chat) => {
            chat.addEventListener('click', () => {
                const id = chat.dataset.id;
                this.eventBus.call('GET_CHAT_MESSAGES', id);
            });
        });
    }

    addUserEventListeners () {
        const toStoreBtn = this.root.querySelector('.js-to-store-button');
        const storeId = document.getElementById('storeHeader').dataset.storeid;
        toStoreBtn.addEventListener('click', () => {
            this.eventBus.call('REDIRECT_TO_STORE_BY_ID', { storeId });
        });
    }
}
