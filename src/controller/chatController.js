import { ChatModel } from '../model/chatModel.js';
import { ChatView } from '../view/chatView.js';
import { EventBus } from '../utils/eventBus.js';

export class ChatController {
    /**
     * Creating controller class for header entity.
     *
     * @param {object} header - Main html div object.
     * @param {router} router - An object that allows to route inside a site.
     */
    constructor (header, router) {
        const eventBus = new EventBus();
        this.router = router;
        this.chatPageHandler = this.chatPageHandler.bind(this);

        this.model = new ChatModel(eventBus);
        this.view = new ChatView(header, eventBus);

        eventBus.subscribe('REDIRECT_TO_STORE_BY_ID', ({ storeId }) => this.router.redirect('partners_stores' + '/' + storeId));
    }

    /**
     * Handling chat page rendering.
     *
     * @param {Number} id - Id of requesting store.
     */
    chatPageHandler ({ id }) {
        this.model.getData(id);
    }
}
