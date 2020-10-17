import { loginRequest } from '../utils/ApiService.js'
import { userFormValidator } from '../utils/validator.js';
import { regTemplates } from '../utils/reg_templates.js';
export class LoginModel {
    constructor (eventBus) {
        this.doLogin = this.doLogin.bind(this);
        this.eventBus = eventBus;
        eventBus.subscribe('SUBMIT_LOGIN', this.doLogin);
    }

    doLogin = async (input) => {
        const { login, password } = input;
        if (this.validate(input)) {
            console.log('data is valid!');
            const { status, response } = await loginRequest({
                login: login.value,
                password: password.value
            });
            if (status === 200) {
                // если залогинились
                // что делать?
                console.log(response);
                this.eventBus.call('REDIRECT_TO_PROFILE');
            }
            // может не быть такого пользователя
            // могут быть 5хх, 3xx
        }
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
        return isValid;
    }
}
