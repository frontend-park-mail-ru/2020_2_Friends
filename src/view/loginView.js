import { renderLoginView } from '../template/loginViewTemplate.js';
export class LoginView {
    constructor (root, eventBus) {
        this.root = root;
        this.eventBus = eventBus;
        this.loginNotValid = this.loginNotValid.bind(this);
        this.passwordNotValid = this.passwordNotValid.bind(this);
        this.render = this.render.bind(this);

        eventBus.subscribe('LOGIN_NOT_VALID', this.loginNotValid);
        eventBus.subscribe('PASSWORD_NOT_VALID', this.passwordNotValid);
    }

    render () {
        const template = renderLoginView();

        this.root.innerHTML = template()
        this.addEventListeners();
    }

    loginNotValid () {
        const loginErrors = this.root.querySelector('.login-errors');
        loginErrors.innerText = 'Имя может содержать только буквы и цифры';
    }

    passwordNotValid () {
        const passwordErrors = this.root.querySelector('.password-errors');
        passwordErrors.innerHTML = 'Длина пароля от 8 до 30 символов<br/>Может содержать только латинские буквы и цифры';
    }

    addEventListeners () {
        const login = this.root.querySelector('.js-input-login');
        const password = this.root.querySelector('.js-input-password');
        const button = this.root.querySelector('.js-submit-login');
        const regButton = this.root.querySelector('.js-reg-button');
        const loginErrors = this.root.querySelector('.login-errors');
        const passwordErrors = this.root.querySelector('.password-errors');

        button.addEventListener('click', () => {
            loginErrors.innerText = '';
            passwordErrors.innerText = '';
            const data = { login, password };
            this.eventBus.call('VALIDATE', data);
        })

        regButton.addEventListener('click', () => {
            this.eventBus.call('REDITECT_TO_REG')
        })
    }
}
