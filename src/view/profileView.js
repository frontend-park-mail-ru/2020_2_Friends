import { renderProfileView } from '../template/profileViewTemplate.js';

export class ProfileView {
    constructor (root, eventBus) {
        this.root = root;
        this.eventBus = eventBus;
        this.loginNotValid = this.loginNotValid.bind(this);
        this.numberNotValid = this.numberNotValid.bind(this);
        this.emailNotValid = this.emailNotValid.bind(this);
        this.render = this.render.bind(this);

        eventBus.subscribe('LOGIN_NOT_VALID', this.loginNotValid);
        eventBus.subscribe('NUMBER_NOT_VALID', this.numberNotValid);
        eventBus.subscribe('EMAIL_NOT_VALID', this.emailNotValid);
    }

    render () {
        const template = renderProfileView();
        const profileHTML = template();

        this.root.innerHTML = profileHTML;
        this.addEventListeners();
    }

    loginNotValid () {
        const loginErrors = this.root.querySelector('.login-errors');
        loginErrors.innerText = 'Имя может содержать только буквы и цифры';
    }

    numberNotValid () {
        const numberErrors = this.root.querySelector('.number-errors');
        numberErrors.innerHTML = 'Номер имеет недопустимый формат!';
    }

    emailNotValid () {
        const emailErrors = this.root.querySelector('.email-errors');
        emailErrors.innerText = 'Поле дожно быть формата something@something.ru';
    }

    addEventListeners () {
        const favoriteStore = this.root.querySelector('#favorite_store');
        const saveInfo = this.root.querySelector('.save_info');
        favoriteStore.addEventListener('click', () => {
            this.eventBus.call('REDIRECT_TO_STORE');
        })

        saveInfo.addEventListener('click', () => {
            const login = this.root.querySelector('.login-input');
            const email = this.root.querySelector('.email-input');
            const number = this.root.querySelector('.number-input');

            const loginErrors = this.root.querySelector('.login-errors');
            const numberErrors = this.root.querySelector('.number-errors');
            const emailErrors = this.root.querySelector('.email-errors');
            loginErrors.innerText = '';
            numberErrors.innerText = '';
            emailErrors.innerText = '';
            const data = { login, number, email };
            this.eventBus.call('VALIDATE', data);
        })
    }
}
