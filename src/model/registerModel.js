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

    doRegistration = async (input) => {
        const { login, email, password, repeatPassword } = input;
        console.log('we registered!');
        if (this.validate(input)) {
            console.log('data is valid!');
            const { status } = await registerRequest({
                login: login.value,
                email: email.value,
                password: password.value
            });
            if (status === 201) {
                console.log('we registered!');
                // дать юзеру понять, что он зарегестрирован
                this.eventBus.subscribe('REDIRECT_TO_LOGIN');
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
            var errorString = 'Длина пароля от 8 до 30 символов<br/>Может содержать только латинские буквы и цифры';
            if (password.value !== repeatPassword.value) {
                errorString = 'Пароли не совпадают';
            }
            this.eventBus.call('PASSWORD_NOT_VALID', errorString)
            isValid = false;
        }
        return isValid;
    }
}
