export class LoginModel {
    constructor (eventBus) {
        this.eventBus = eventBus;
        eventBus.subscribe('SUBMIT_LOGIN', this.doLogin);
    }

    doLogin (input) {
        console.log('doLogin');
    }
}
