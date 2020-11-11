import { ProfileModel } from '../model/profileModel.js';
import { ProfileView } from '../view/profileView.js';
import { EventBus } from '../utils/eventBus.js';

export class ProfileController {
    /**
     * Creating controller class for profile entity.
     *
     * @param {object} root - Main html div object.
     * @param {router} router - An object that allows to route inside a site.
     */
    constructor (root, router) {
        const eventBus = new EventBus();
        this.router = router;

        this.model = new ProfileModel(eventBus);
        this.view = new ProfileView(root, eventBus);

        eventBus.subscribe('REDIRECT_TO_STORE', () => this.router.redirect('store'));
        eventBus.subscribe('REDIRECT_TO_BUCKET', () => this.router.redirect('bucket'));
        eventBus.subscribe('REDIRECT_TO_LOGIN', () => this.router.redirect('login'));
    }
}
