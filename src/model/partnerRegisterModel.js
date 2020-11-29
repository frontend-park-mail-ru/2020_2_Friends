import { partnerRegisterRequest } from '../utils/ApiService.js';
import { userFormValidator } from '../utils/validator.js';
import { regTemplates } from '../utils/reg_templates.js';
import webSocket from '../utils/webSocket.js';
export class PartnerRegisterModel {
    /**
     * Creating an RegisterModel instance.
     *
     * @param {eventBus} eventBus - A container to exchange MVC interactions inside one MVC entity.
     */
    constructor (eventBus) {
        this.doRegistration = this.doRegistration.bind(this);
        this.socket = webSocket;
        this.eventBus = eventBus;

        eventBus.subscribe('SUBMIT_REG', this.doRegistration);
    }

    /**
     * Event handler for user registration.
     *
     * @param {object} input - User-passed data.
     */
    async doRegistration (input) {
        const { login, email, password } = input;
        if (this.validate(input)) {
            const response = await partnerRegisterRequest({
                login: login.value,
                email: email.value,
                password: password.value
            });
            switch (response.status) {
            case 201:
                this.socket.connect();
                localStorage.setItem('isAdmin', true);
                this.eventBus.call('REDIRECT_TO_PROFILE');
                break;
            case 400:
                this.eventBus.call('REGISTER_NOT_VALID');
                break;
            case 409:
                // This username was already taken
                this.eventBus.call('USERNAME_NOT_VALID');
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
        const { login, email, password, repeatPassword } = input;
        let isValid = true;
        const emailValidator = userFormValidator(email, regTemplates.email);
        if (!emailValidator.status) {
            this.eventBus.call('EMAIL_NOT_VALID');
            isValid = false;
        }
        const loginValidator = userFormValidator(login, regTemplates.username);
        if (!loginValidator.status) {
            this.eventBus.call('LOGIN_NOT_VALID');
            isValid = false;
        }
        const password1Validator = userFormValidator(password, regTemplates.password);
        const password2Validator = userFormValidator(repeatPassword, regTemplates.password);
        if (!password1Validator.status || !password2Validator.status) {
            let errorString = 'Длина пароля от 8 до 30 символов<br/>Может содержать только латинские буквы и цифры';
            if (password.value !== repeatPassword.value) {
                errorString = 'Пароли не совпадают';
            }
            this.eventBus.call('PASSWORD_NOT_VALID', errorString);
            isValid = false;
        }
        return isValid;
    }
}
