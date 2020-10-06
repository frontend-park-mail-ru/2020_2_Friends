import { renderRegisterView } from '../template/registerViewTemplate.js';
import { userFormValidator } from '../utils/validator.js';
import { regTemplates } from '../utils/reg_templates.js';

export class RegisterView {
    constructor (root, eventBus) {
        this.root = root;
        this.eventBus = eventBus;
    }

    render () {
        const template = renderRegisterView();

        this.root.innerHTML = template()
        this.addEventListeners();
    }

    addEventListeners () {
        const login = this.root.querySelector('.js-input-login');
        const email = this.root.querySelector('.js-input-email');
        const password = this.root.querySelector('.js-input-password');
        const repeatPassword = this.root.querySelector('.js-input-password-second');
        const button = this.root.querySelector('.js-submit-reg');
        button.addEventListener('click', () => {
            const data = { login: login.value, password: password.value };

            const usernameErrors = this.root.querySelector('.username-errors');
            const passwordErrors = this.root.querySelector('.password-errors');
            const emailErrors = this.root.querySelector('.email-errors');
            let isValid = true;
            usernameErrors.innerText = '';
            passwordErrors.innerText = '';
            emailErrors.innerText = '';
            const emailValidator = userFormValidator(email, regTemplates.email, 'Поле дожно быть формата something@something.ru');
            if (!emailValidator.status) {
                emailErrors.innerText = emailValidator.message;
                isValid = false;
            }
            const usernameValidator = userFormValidator(login, regTemplates.username, 'Имя может содержать только буквы и цифры');
            if (!usernameValidator.status) {
                usernameErrors.innerText = usernameValidator.message;
                isValid = false;
            }
            const password1Validator = userFormValidator(password,
                regTemplates.password,
                'Длина пароля от 8 до 30 символов<br/>Может содержать только латинские буквы и цифры');
            const password2Validator = userFormValidator(repeatPassword,
                regTemplates.password,
                'Длина пароля от 8 до 30 символов<br/>Может содержать только латинские буквы и цифры');
            if (!password1Validator.status || !password2Validator.status) {
                passwordErrors.innerHTML = password1Validator.message;
                isValid = false;
            }
            if (password.value !== repeatPassword.value) {
                passwordErrors.innerHTML = 'Пароли не совпадают';
                isValid = false;
            }
            if (!isValid) {
                return;
            }
            // ЗДЕСЬ НАСТОЯЩАЯ РЕГИСТРАЦИЯ!!!

            this.eventBus.call('SUBMIT_REG', data);
        })
    }
}
