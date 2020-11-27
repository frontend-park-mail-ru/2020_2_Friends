import { chatView } from '../template/chatViewTemplate.js';
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
        this.render = this.render.bind(this);
        eventBus.subscribe('SHOW_CHATS', this.render);
    }

    render (data) {
        const template = chatView();
        this.root.innerHTML = template(data);
        this.addEventListeners();
    }

    addEventListeners () {
        const toStoreBtn = this.root.querySelector('.js-to-store-button');
        const storeId = document.getElementById('storeHeader').dataset.storeid;
        toStoreBtn.addEventListener('click', () => {
            this.eventBus.call('REDIRECT_TO_STORE_BY_ID', { storeId });
        });
    }
}
