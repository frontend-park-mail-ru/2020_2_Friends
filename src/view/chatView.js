import { chatView, messageToUserView, messageFromUserView, chatListItemView, userChatView } from '../template/chatViewTemplate.js';
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
        this.support = document.getElementById('support');
        this.eventBus = eventBus;
        this.showChatList = this.showChatList.bind(this);
        this.showChatMessages = this.showChatMessages.bind(this);
        this.showMessageFromMe = this.showMessageFromMe.bind(this);
        this.showMessageToMe = this.showMessageToMe.bind(this);
        this.showMessageToMeAdmin = this.showMessageToMeAdmin.bind(this);
        this.showUserChat = this.showUserChat.bind(this);

        eventBus.subscribe('SHOW_CHAT_LIST', this.showChatList);
        eventBus.subscribe('SHOW_CHAT_MESSAGES', this.showChatMessages);
        eventBus.subscribe('SHOW_MESSAGE_FROM_ME', this.showMessageFromMe);
        eventBus.subscribe('SHOW_MESSAGE_TO_ME', this.showMessageToMe);
        eventBus.subscribe('SHOW_MESSAGE_TO_ME_ADMIN', this.showMessageToMeAdmin);
    }

    showChatList (data) {
        console.log(data);
        const template = chatView();
        this.root.innerHTML = template(data);
        this.addEventListeners();
    }

    showUserChat (data) {
        const oldChat = this.support.querySelector('.user-chat');
        if (oldChat) {
            oldChat.remove();
        }
        const template = userChatView();
        this.support.innerHTML = template(data);
        this.eventBus.call('GET_CHAT_MESSAGES', data.order_id);
        const chatMessages = this.support.querySelector('.chat-messages');
        chatMessages.scrollTop = chatMessages.scrollHeight;
        this.addUserChatEventListeners();
    }

    addUserChatEventListeners () {
        const support = document.getElementById('js-close-chat');
        support.addEventListener('click', () => {
            this.support.querySelector('.user-chat').remove();
        });
        const newMessage = this.support.querySelector('.js-send-message');
        newMessage.addEventListener('click', () => {
            const text = this.support.querySelector('.js-message-input').value;
            this.support.querySelector('.js-message-input').value = '';
            if (text) {
                this.eventBus.call('SEND_MESSAGE', { order_id: parseInt(newMessage.dataset.id), text: text });
            }
        });
    }

    showChatMessages (data) {
        const toUserTemplate = messageToUserView();
        const fromUserTemplate = messageFromUserView();

        // сделать чат в списке выделенным (если он есть) и показать все сообщения в чате
        let chatMessages = this.root.querySelector('.chat-messages');
        if (!chatMessages) {
            chatMessages = this.support.querySelector('.chat-messages');
        }

        chatMessages.innerHTML = '';
        data.messages.forEach((message) => {
            if (message.is_your_msg) {
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
        let chatMessages = this.root.querySelector('.chat-messages');
        if (!chatMessages) {
            chatMessages = this.support.querySelector('.chat-messages');
        }

        const fromUserTemplate = messageFromUserView();
        chatMessages.innerHTML += fromUserTemplate(data);
    }

    showMessageToMe (data) {
        let chatMessages = this.root.querySelector('.chat-messages');
        if (!chatMessages) {
            chatMessages = this.support.querySelector('.chat-messages');
        }
        if (chatMessages) {
            const toUserTemplate = messageToUserView();
            chatMessages.innerHTML += toUserTemplate(data);
        }
    }

    showMessageToMeAdmin (data) {
        const chat = document.getElementById('chat-' + data.order_id);
        if (!chat) {
            // если нет - добавить с список и открыть и обновить последнее сообщение
            const chatsList = this.root.querySelector('.chats-items');
            const chatItem = chatListItemView();
            chatsList.innerHTML += chatItem(data);
            const chat = document.getElementById('chat-' + data.order_id);
            chat.addEventListener('click', () => {
                const id = chat.dataset.id;
                this.eventBus.call('GET_CHAT_MESSAGES', id);
            });
        } else {
            // если есть - обновить в списке последнее сообщение
            chat.querySelector('.chats-item-last-message').innerHTML = data.text;
            // проверить, открыт ли чат и если да - добавить в него сообщение
            if (chat.classList.contains('chats-item__open')) {
                this.showMessageToMe(data);
            }
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
                this.eventBus.call('SEND_MESSAGE', { order_id: parseInt(newMessage.dataset.id), text: text });
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
