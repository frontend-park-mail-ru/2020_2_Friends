export class ProfileModel {
    constructor (attrs = null, isLoaded = false, eventBus) {
        const defaults = {
            id: null,
            username: null,
            email: null
        };

        this.attrs = { ...defaults, ...attrs };
        this.isLoaded = isLoaded;
        this.eventBus = eventBus;

        // eventBus.subscribe('ADD_ADDRESS', this.doLogin);
        // eventBus.subscribe('DELETE_ADDRESS', this.doLogin);
        // eventBus.subscribe('ADD_AVATAR', this.doLogin);
        // eventBus.subscribe('CHANGE_NAME', this.doLogin);
    }
}
