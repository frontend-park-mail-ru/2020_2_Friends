import { registerRequest } from '../utils/ApiService.js'
import { userFormValidator } from '../utils/validator.js';
import { regTemplates } from '../utils/reg_templates.js';

export class RegisterModel {
    constructor (eventBus) {
        this.doRegistration = this.doRegistration.bind(this);
        this.eventBus = eventBus;
        eventBus.subscribe('SUBMIT_REG', this.doRegistration);
        eventBus.subscribe('LOGOUT', this.logOut);
        eventBus.subscribe('CHANGE_INFO', this.logOutchangePersonalInfo);
    }

    async doRegistration (input) {
        const { login, email, password } = input;
        if (this.validate(input)) {
            console.log('data is valid!');
            const response = await registerRequest({
                login: login.value,
                email: email.value,
                password: password.value
            });

            if (response.status === 201) {
                // дать юзеру понять, что он зарегестрирован
                this.eventBus.subscribe('REDIRECT_TO_LOGIN');
            } else if (response.status === 400) {
                this.eventBus.call('REGISTER_NOT_VALID');
            } else if (response.status === 409) {
                // This username was already taken
                this.eventBus.call('USERNAME_NOT_VALID');
            } else if (response.status === 500) {
                this.eventBus.call('SERVER_NOT_VALID');
            } else {
                console.log('Uncaught backend http-status');
            }
        }
        // тут могут быть 5хх
    }

    validate (input) {
        const { login, email, password, repeatPassword } = input;
        let isValid = true;
        const emailValidator = userFormValidator(email, regTemplates.email);
        if (!emailValidator.status) {
            this.eventBus.call('EMAIL_NOT_VALID')
            isValid = false;
        }
        const loginValidator = userFormValidator(login, regTemplates.username);
        if (!loginValidator.status) {
            this.eventBus.call('LOGIN_NOT_VALID')
            isValid = false;
        }
        const password1Validator = userFormValidator(password, regTemplates.password);
        const password2Validator = userFormValidator(repeatPassword, regTemplates.password);
        if (!password1Validator.status || !password2Validator.status) {
            let errorString = 'Длина пароля от 8 до 30 символов<br/>Может содержать только латинские буквы и цифры';
            if (password.value !== repeatPassword.value) {
                errorString = 'Пароли не совпадают';
            }
            this.eventBus.call('PASSWORD_NOT_VALID', errorString)
            isValid = false;
        }
        return isValid;
    }
}
