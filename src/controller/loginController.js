import { LoginModel } from '../model/loginModel.js';
import { LoginView } from '../view/loginView.js';
import { EventBus } from '../utils/eventBus.js';

export class LoginController {
    /**
     * Creating controller class for login entity.
     *
     * @param {object} root - Main html div object.
     * @param {router} router - An object that allows to route inside a site.
     */
    constructor (root, router) {
        const eventBus = new EventBus();
        this.router = router;

        this.model = new LoginModel(eventBus);
        this.view = new LoginView(root, eventBus);

        eventBus.subscribe('REDIRECT_TO_REG', () => this.router.redirect('register'));
        eventBus.subscribe('REDIRECT_TO_PROFILE', () => this.router.redirect('profile'));
        eventBus.subscribe('REDIRECT_TO_ALL_STORES', () => this.router.redirect('/'));
    }
}
