import { LoginModel } from '../model/loginModel.js';
import { LoginView } from '../view/loginView.js';
import { EventBus } from '../utils/eventBus.js'

export class LoginController {
    constructor (root) {
        const eventBus = new EventBus();

        this.model = new LoginModel(eventBus);
        this.view = new LoginView(root, eventBus);
    }
}
