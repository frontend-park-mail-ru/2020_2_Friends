import { ProfileModel } from '../model/profileModel.js';
import { ProfileView } from '../view/profileView.js';
import { EventBus } from '../utils/eventBus.js'

export class ProfileController {
    constructor (root) {
        const eventBus = new EventBus();

        this.model = new ProfileModel(eventBus);
        this.view = new ProfileView(root, eventBus);

        eventBus.subscribe('REDITECT_TO_STORE', () => this.router.redirect('store'));
    }
}
