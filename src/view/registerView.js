import { renderRegisterView } from '../template/registerViewTemplate.js';

export class RegisterView {
    constructor (root, eventBus) {
        this.root = root;
        this.eventBus = eventBus;
        this.loginNotValid = this.loginNotValid.bind(this);
        this.passwordNotValid = this.passwordNotValid.bind(this);
        this.emailNotValid = this.emailNotValid.bind(this);
        this.usernameNotValid = this.usernameNotValid.bind(this);
        this.render = this.render.bind(this);

        eventBus.subscribe('LOGIN_NOT_VALID', this.loginNotValid);
        eventBus.subscribe('PASSWORD_NOT_VALID', this.passwordNotValid);
        eventBus.subscribe('EMAIL_NOT_VALID', this.emailNotValid);
        eventBus.subscribe('USERNAME_NOT_VALID', this.usernameNotValid);
    }

    render () {
        const template = renderRegisterView();

        this.root.innerHTML = template()
        this.addEventListeners();
    }

    usernameNotValid () {
        const usernameErrors = this.root.querySelector('.login-errors');
        usernameErrors.innerText = 'Имя пользователя уже занято';
    }

    loginNotValid () {
        const loginErrors = this.root.querySelector('.login-errors');
        loginErrors.innerText = 'Имя может содержать только буквы и цифры';
    }

    passwordNotValid (errorString) {
        const passwordErrors = this.root.querySelector('.password-errors');
        passwordErrors.innerHTML = errorString;
    }

    emailNotValid () {
        const emailErrors = this.root.querySelector('.email-errors');
        emailErrors.innerText = 'Поле дожно быть формата something@something.ru';
    }

    addEventListeners () {
        const login = this.root.querySelector('.js-input-login');
        const email = this.root.querySelector('.js-input-email');
        const password = this.root.querySelector('.js-input-password');
        const repeatPassword = this.root.querySelector('.js-input-password-second');
        const button = this.root.querySelector('.js-submit-reg');
        button.addEventListener('click', () => {
            const loginErrors = this.root.querySelector('.login-errors');
            const passwordErrors = this.root.querySelector('.password-errors');
            const emailErrors = this.root.querySelector('.email-errors');
            loginErrors.innerText = '';
            passwordErrors.innerText = '';
            emailErrors.innerText = '';
            const data = { login, email, password, repeatPassword };
            this.eventBus.call('SUBMIT_REG', data);
        })
    }
}
