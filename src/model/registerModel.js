import { registerRequest } from '../utils/ApiService.js'

export class RegisterModel {
    constructor (eventBus) {
        this.eventBus = eventBus;
        eventBus.subscribe('SUBMIT_REG', this.doRegistration);
    }

    doRegistration (input) {
        console.log('doLogin');
        registerRequest(input);
        console.log('doLogin');
    }
}
