import { userFormValidator } from '../utils/validator.js';
import { regTemplates } from '../utils/reg_templates.js';
export class ProfileModel {
    constructor (eventBus) {
        this.validate = this.validate.bind(this);

        this.eventBus = eventBus;
        eventBus.subscribe('LOGOUT', this.changePersonalInfo);
        eventBus.subscribe('CHANGE_INFO', this.logOut);
        eventBus.subscribe('VALIDATE', this.validate);
    }

    changePersonalInfo (input) {
        console.log('changePersonalInfo');
    }

    logOut (input) {
        console.log('logOut');
    }

    validate (input) {
        const { login, number, email } = input;
        let isValid = true;
        const loginValidator = userFormValidator(login, regTemplates.username);
        if (!loginValidator.status) {
            this.eventBus.call('LOGIN_NOT_VALID');
            isValid = false;
        }

        const numberValidator = userFormValidator(number, regTemplates.number);
        if (!numberValidator.status) {
            this.eventBus.call('NUMBER_NOT_VALID');
            isValid = false;
        }
        const emailValidator = userFormValidator(email, regTemplates.email);
        if (!emailValidator.status) {
            this.eventBus.call('EMAIL_NOT_VALID');
            isValid = false;
        }
        if (isValid) {
            console.log('logIN'); // eventBus.call('LOG_IN');
        }
    }
}
