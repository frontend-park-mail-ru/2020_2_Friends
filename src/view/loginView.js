import { renderLoginView } from '../template/loginViewTemplate.js';
import { userFormValidator } from '../utils/validator.js';
import { regTemplates } from '../utils/reg_templates.js';

export class LoginView {
    constructor (root, eventBus) {
        this.root = root;
        this.eventBus = eventBus;
    }

    render () {
        const template = renderLoginView();

        this.root.innerHTML = template()
        this.addEventListeners();
    }

    addEventListeners () {
        const login = this.root.querySelector('.js-input-login');
        const password = this.root.querySelector('.js-input-password');
        const button = this.root.querySelector('.js-submit-login');
        const regButton = this.root.querySelector('.js-reg-button');
        const formErrors = this.root.querySelector('.form-errors');

        button.addEventListener('click', () => {
            const data = { login: login.value, password: password.value };
            let isValid = true;

            formErrors.innerText = '';

            const usernameValidator = userFormValidator(
                login, regTemplates.username,
                'Имя может содержать только буквы и цифры. Минимальная длина 2 символа'
            );

            if (!usernameValidator.status) {
                formErrors.innerText = usernameValidator.message;
                isValid = false;
            }

            const password1Validator = userFormValidator(password,
                regTemplates.password,
                'Длина пароля от 8 до 30 символов<br />Может содержать только латинские буквы и цифры');

            if (!password1Validator.status) {
                formErrors.innerHTML = password1Validator.message;
                isValid = false;
            }

            if (!isValid) {
                return;
            }
            // ЗДЕСЬ ДОЛЖНО БЫТЬ САМО ЗАЛОГИНИВАНИЕ
            if (this.eventBus.call('SUBMIT_LOGIN', data)) {
                this.eventBus.call('REDITECT_TO_PROFILE');
            }
        })

        regButton.addEventListener('click', () => {
            this.eventBus.call('REDITECT_TO_REG')
        })
    }
}
