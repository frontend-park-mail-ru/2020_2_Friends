import { HeaderModel } from '../model/headerModel.js';
import { HeaderView } from '../view/headerView.js';
import { EventBus } from '../utils/eventBus.js';

export class HeaderController {
    /**
     * Creating controller class for header entity.
     *
     * @param {object} header - Main html div object.
     * @param {router} router - An object that allows to route inside a site.
     */
    constructor (header, router) {
        const eventBus = new EventBus();
        this.router = router;

        this.model = new HeaderModel(eventBus);
        this.view = new HeaderView(header, eventBus);

        eventBus.subscribe('REDIRECT_TO_STORE', () => this.router.redirect('store'));
        eventBus.subscribe('REDIRECT_TO_BUCKET', () => this.router.redirect('bucket'));
        eventBus.subscribe('REDIRECT_TO_ADMIN_STORE', () => this.router.redirect('partners_store'));
        eventBus.subscribe('REDIRECT_TO_ADMIN_LOGIN', () => this.router.redirect('partners_login'));
        eventBus.subscribe('REDIRECT_TO_ADMIN_PROFILE', () => this.router.redirect('partners_profile'));
        eventBus.subscribe('REDIRECT_TO_LOGIN', () => this.router.redirect('login'));
        eventBus.subscribe('REDIRECT_TO_PROFILE', () => this.router.redirect('profile'));
    }
}
