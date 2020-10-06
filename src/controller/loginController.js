import { LoginModel } from '../model/loginModel.js';
import { LoginView } from '../view/loginView.js';
import { EventBus } from '../utils/eventBus.js'

export class LoginController {
    constructor (root, router) {
        const eventBus = new EventBus();
        this.router = router

        this.model = new LoginModel(eventBus);
        this.view = new LoginView(root, eventBus);
        eventBus.subscribe('REDITECT_TO_REG', () => this.router.redirect('register'));
        eventBus.subscribe('REDITECT_TO_PROFILE', () => this.router.redirect('profile'));
    }
}
