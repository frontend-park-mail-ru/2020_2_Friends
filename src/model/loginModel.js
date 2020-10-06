import { loginRequest, cookieRequest } from '../utils/ApiService.js'

export class LoginModel {
    constructor (eventBus) {
        this.eventBus = eventBus;
        eventBus.subscribe('SUBMIT_LOGIN', this.doLogin);
    }

    doLogin (input) {
        console.log('doLogin');
        loginRequest(input);
        console.log('Login passed');
        cookieRequest();
    }
}
