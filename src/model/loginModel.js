import { loginRequest, cookieRequest } from '../utils/ApiService.js'
import { userFormValidator } from '../utils/validator.js';
import { regTemplates } from '../utils/reg_templates.js';
export class LoginModel {
    constructor (eventBus) {
        this.validate = this.validate.bind(this);

        this.eventBus = eventBus;
        eventBus.subscribe('SUBMIT_LOGIN', this.doLogin);
        eventBus.subscribe('VALIDATE', this.validate);
    }

    doLogin (input) {
        console.log('doLogin');
        loginRequest(input);
        console.log('Login passed');
        cookieRequest();
    }

    validate (input) {
        const { login, password } = input;
        let isValid = true;
        const loginValidator = userFormValidator(login, regTemplates.username);
        if (!loginValidator.status) {
            this.eventBus.call('LOGIN_NOT_VALID');
            isValid = false;
        }
        const passwordValidator = userFormValidator(password, regTemplates.password);
        if (!passwordValidator.status) {
            this.eventBus.call('PASSWORD_NOT_VALID');
            isValid = false;
        }
        if (isValid) {
            console.log('logIN');
            this.eventBus.call('REDITECT_TO_PROFILE')
        }
    }
}
