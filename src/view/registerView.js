import { renderRegisterView } from '../template/registerViewTemplate.js';

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
        const password = this.root.querySelector('.js-input-password');
        const repeatPassword = this.root.querySelector('.js-input-password-second');
        const button = this.root.querySelector('.js-submit-reg');

        button.addEventListener('click', () => {
            const data = { login: login.value, password: password.value };
            this.eventBus.call('SUBMIT_REG', data);
        })
    }
}
