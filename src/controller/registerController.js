import { RegisterModel } from '../model/registerModel.js';
import { RegisterView } from '../view/registerView.js';
import { EventBus } from '../utils/eventBus.js'

export class RegisterController {
    constructor (root, router) {
        const eventBus = new EventBus();

        this.model = new RegisterModel(eventBus);
        this.view = new RegisterView(root, eventBus);
    }
}
