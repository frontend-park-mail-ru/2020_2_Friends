export class ProfileModel {
    constructor (eventBus) {
        this.eventBus = eventBus;
        eventBus.subscribe('LOGOUT', this.changePersonalInfo);
        eventBus.subscribe('CHANGE_INFO', this.logOut);
    }

    changePersonalInfo (input) {
        console.log('changePersonalInfo');
    }

    logOut (input) {
        console.log('logOut');
    }
}
