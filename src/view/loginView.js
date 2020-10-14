import { renderLoginView } from '../template/loginViewTemplate.js';
import { userFormValidator } from '../utils/validator.js';
import { regTemplates } from '../utils/reg_templates.js';

export class LoginView {
    constructor (root, eventBus) {
        this.root = root;
        this.eventBus = eventBus;
    }

    render = () => {
        const template = renderLoginView();

        this.root.innerHTML = template()
        this.addEventListeners();
    }

    addEventListeners () {
        const login = this.root.querySelector('.js-input-login');
        const password = this.root.querySelector('.js-input-password');
        const button = this.root.querySelector('.js-submit-login');
        const regButton = this.root.querySelector('.js-reg-button');
        const usernameErrors = this.root.querySelector('.username-errors');
        const passwordErrors = this.root.querySelector('.password-errors');

        button.addEventListener('click', () => {
            // const data = { login: login.value, password: password.value };
            let isValid = true;

            usernameErrors.innerText = '';
            passwordErrors.innerText = '';

            const usernameValidator = userFormValidator(login, regTemplates.username);

            if (!usernameValidator.status) {
                usernameErrors.innerText = 'Имя может содержать только буквы и цифры.Минимальная длина 2 символа';
                isValid = false;
            }

            const password1Validator = userFormValidator(password, regTemplates.password);

            if (!password1Validator.status) {
                passwordErrors.innerHTML = 'Длина пароля от 8 до 30 символов<br/>Может содержать только латинские буквы и цифры';
                isValid = false;
            }

            if (!isValid) {
                return;
            }
            // ЗДЕСЬ ДОЛЖНО БЫТЬ САМО ЗАЛОГИНИВАНИЕ
            this.eventBus.call('REDITECT_TO_PROFILE');
        })

        regButton.addEventListener('click', () => {
            this.eventBus.call('REDITECT_TO_REG')
        })
    }
}
