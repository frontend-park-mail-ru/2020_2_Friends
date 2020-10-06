import { renderLoginView } from '../template/loginViewTemplate.js';

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

        button.addEventListener('click', () => {
            const data = { login: login.value, password: password.value };
            this.eventBus.call('SUBMIT_LOGIN', data);
        })

        regButton.addEventListener('click', () => {
            this.eventBus.call('REDITECT_TO_REG')
        })
    }
}
