import { ProfileModel } from '../model/profileModel.js';
import { ProfileView } from '../view/profileView.js';
import { EventBus } from '../utils/eventBus.js'

export class ProfileController {
    constructor (root, router) {
        const eventBus = new EventBus();
        this.router = router

        this.model = new ProfileModel(eventBus);
        this.view = new ProfileView(root, eventBus);
        eventBus.subscribe('REDIRECT_TO_STORE', () => this.router.redirect('store'));
    }
}
