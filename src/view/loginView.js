// import { renderLoginView } from '../template/loginViewTemplate.js';
import { loginTemplate } from '../templates/loginTemplate.hbs';
export class LoginView {
    /**
     * Creating an LoginView instance.
     * Allows to render login page and response correctly to user's interaction with page.
     *
     * @param {eventBus} eventBus - A container to exchange MVC interactions inside one MVC entity.
     * @param {object} root - Main html div object.
     */
    constructor (root, eventBus) {
        this.root = root;
        this.eventBus = eventBus;

        this.loginNotValid = this.loginNotValid.bind(this);
        this.passwordNotValid = this.passwordNotValid.bind(this);
        this.loginOrPasswordNotValid = this.loginOrPasswordNotValid.bind(this);
        this.serverNotValidr = this.serverNotValid.bind(this);
        this.render = this.render.bind(this);

        eventBus.subscribe('LOGIN_NOT_VALID', this.loginNotValid);
        eventBus.subscribe('PASSWORD_NOT_VALID', this.passwordNotValid);
        eventBus.subscribe('LOGIN_OR_PASSWORD_NOT_VALID', this.loginOrPasswordNotValid);
        eventBus.subscribe('SERVER_NOT_VALID', this.serverNotValid);
    }

    /**
     * Rendering login page and setting event listeners.
     */
    render () {
        // const template = renderLoginView();
        const template = loginTemplate;

        this.root.innerHTML = template;
        this.addEventListeners();
    }

    /**
     * Reacting to server not valid error.
     */
    serverNotValid () {
        const serverErrors = this.root.querySelector('.js-login-errors');
        serverErrors.innerText = 'Упс! Сервер устал, подождите и попробуйте заново!';
    }

    /**
     * Reacting to login or password not valid error.
     */
    loginOrPasswordNotValid () {
        const inputErrors = this.root.querySelector('.js-login-errors');
        inputErrors.innerText = 'Неверное имя пользователя или пароль';
    }

    /**
     * Reacting to login not valid error.
     */
    loginNotValid () {
        const loginErrors = this.root.querySelector('.js-login-errors');
        loginErrors.innerText = 'Имя может содержать только буквы и цифры';
    }

    /**
     * Reacting to password not valid error.
     */
    passwordNotValid () {
        const passwordErrors = this.root.querySelector('.js-password-errors');
        passwordErrors.innerHTML = 'Длина пароля от 8 до 30 символов<br/>Может содержать только латинские буквы и цифры';
    }

    /**
     * Setting event listeners for login page.
     */
    addEventListeners () {
        const login = this.root.querySelector('.js-input-login');
        const password = this.root.querySelector('.js-input-password');
        const button = this.root.querySelector('.js-submit-login');
        const regButton = this.root.querySelector('.js-reg-button');
        const loginErrors = this.root.querySelector('.js-login-errors');
        const passwordErrors = this.root.querySelector('.js-password-errors');

        button.addEventListener('click', () => {
            loginErrors.innerText = '';
            passwordErrors.innerText = '';
            const data = { login, password };
            this.eventBus.call('SUBMIT_LOGIN', data);
        });

        regButton.addEventListener('click', () => {
            this.eventBus.call('REDIRECT_TO_REG');
        });
    }
}
