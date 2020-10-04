export class LoginModel {
    constructor (eventBus) {
        this.eventBus = eventBus;
        eventBus.subscribe('SUBMIT_LOGIN', this.doLogin);
        eventBus.subscribe('SUBMIT_LOGIN', this.doLogin2);
    }

    doLogin (input) {
        console.log('doLogin');
    }
}
