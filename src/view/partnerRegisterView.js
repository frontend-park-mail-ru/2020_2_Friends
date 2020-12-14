import partnerRegisterTemplate from '../templates/partnerRegisterTemplate.hbs';

export class PartnerRegisterView {
    /**
     * Creating an RegisterView instance.
     * Allows to render register page and response correctly to user's interaction with page.
     *
     * @param {eventBus} eventBus - A container to exchange MVC interactions inside one MVC entity.
     * @param {object} root - Main html div object.
     */
    constructor (root, eventBus) {
        this.root = root;
        this.eventBus = eventBus;

        this.loginNotValid = this.loginNotValid.bind(this);
        this.passwordNotValid = this.passwordNotValid.bind(this);
        this.emailNotValid = this.emailNotValid.bind(this);
        this.usernameNotValid = this.usernameNotValid.bind(this);
        this.registerNotValid = this.registerNotValid.bind(this);
        this.render = this.render.bind(this);

        eventBus.subscribe('LOGIN_NOT_VALID', this.loginNotValid);
        eventBus.subscribe('PASSWORD_NOT_VALID', this.passwordNotValid);
        eventBus.subscribe('EMAIL_NOT_VALID', this.emailNotValid);
        eventBus.subscribe('USERNAME_NOT_VALID', this.usernameNotValid);
        eventBus.subscribe('REGISTER_NOT_VALID', this.registerNotValid);
        eventBus.subscribe('SERVER_NOT_VALID', this.serverNotValid);
    }

    /**
     * Rendering register page and setting event listeners.
     */
    render () {
        this.root.innerHTML = partnerRegisterTemplate();
        this.addEventListeners();
    }

    /**
     * Reacting to server not valid error.
     */
    serverNotValid () {
        const serverErrors = this.root.querySelector('.login-errors');
        serverErrors.innerText = 'Упс! Сервер устал, подождите и попробуйте заново!';
    }

    /**
     * Reacting to register not valid error.
     */
    registerNotValid () {
        const registerErrors = this.root.querySelector('.login-errors');
        registerErrors.innerText = 'Что-то пошло не так, попробуйте заново!';
    }

    /**
     * Reacting to username not valid error.
     */
    usernameNotValid () {
        const usernameErrors = this.root.querySelector('.js-login-errors');
        usernameErrors.innerText = 'Имя пользователя уже занято';
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
    passwordNotValid (errorString) {
        const passwordErrors = this.root.querySelector('.js-password-errors');
        passwordErrors.innerHTML = errorString;
    }

    /**
     * Reacting to email not valid error.
     */
    emailNotValid () {
        const emailErrors = this.root.querySelector('.js-email-errors');
        emailErrors.innerText = 'Поле дожно быть формата something@something.ru';
    }

    /**
     * Setting event listeners for register page.
     */
    addEventListeners () {
        const login = this.root.querySelector('.js-input-login');
        const email = this.root.querySelector('.js-input-email');
        const password = this.root.querySelector('.js-input-password');
        const repeatPassword = this.root.querySelector('.js-input-password-second');
        const button = this.root.querySelector('.js-submit-reg');
        button.addEventListener('click', () => {
            const loginErrors = this.root.querySelector('.js-login-errors');
            const passwordErrors = this.root.querySelector('.js-password-errors');
            const emailErrors = this.root.querySelector('.js-email-errors');
            loginErrors.innerText = '';
            passwordErrors.innerText = '';
            emailErrors.innerText = '';
            const data = { login, email, password, repeatPassword };
            this.eventBus.call('SUBMIT_REG', data);
        });
        const toLogin = this.root.querySelector('.js-to-login');
        toLogin.addEventListener('click', () => {
            this.eventBus.call('REDIRECT_TO_LOGIN');
        });
    }
}
