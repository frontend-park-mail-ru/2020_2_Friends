import { loginRequest } from '../utils/ApiService.js';
import { userFormValidator } from '../utils/validator.js';
import { regTemplates } from '../utils/reg_templates.js';
import webSocket from '../utils/Socket.js';

export class LoginModel {
    /**
     * Creating an LoginModel instance.
     *
     * @param {eventBus} eventBus - A container to exchange MVC interactions inside one MVC entity.
     */
    constructor (eventBus) {
        this.socket = webSocket;
        this.doLogin = this.doLogin.bind(this);

        this.eventBus = eventBus;

        eventBus.subscribe('SUBMIT_LOGIN', this.doLogin);
    }

    /**
     * Event handler for user login.
     *
     * @param {object} input - User-passed data.
     */
    async doLogin (input) {
        const { login, password } = input;
        if (this.validate(input)) {
            const response = await loginRequest({
                login: login.value,
                password: password.value
            });
            console.log(response);
            switch (response.status) {
            case 200:
                this.socket.connect();
                localStorage.removeItem('isAdmin');
                this.eventBus.call('REDIRECT_TO_PROFILE');
                break;
            case 400:
                this.eventBus.call('LOGIN_OR_PASSWORD_NOT_VALID');
                break;
            case 500:
                this.eventBus.call('SERVER_NOT_VALID');
                break;
            default:
                console.log(`Uncaught backend http-status: ${response.status}`);
            }
        }
    }

    /**
     * Checking user-passed data to pass in into http-request.
     *
     * @param {object} input - User-passed data.
     *
     * @return {boolean} isValid - Result of validating.
     */
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
