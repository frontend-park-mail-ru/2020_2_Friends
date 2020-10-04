import { renderLoginView } from '../template/loginViewTemplate.js';

export class LoginView {
    constructor (root, eventBus) {
        this.root = root;
        this.eventBus = eventBus;
    }

    render () {
        const template = renderLoginView();
        const loginHTML = template();

        this.root.innerHTML = loginHTML;
        this.addEventListeners();
    }

    addEventListeners() {
        const login = this.root.querySelector('.js-input-login');
        const password = this.root.querySelector('.js-input-password');
        const button =  this.root.querySelector('.js-submit-login');

        button.addEventListener('click', () => {
    //   if (validateLogin(login.value) && validatePassword(password.value)) {
    //     const data = {login: login.value, password: password.value};
    //     this.eventBus.call('SUBMIT_LOGIN', data);
    //   }
            const data = {login: login.value, passwort: password.value};
            this.eventBus.call('SUBMIT_LOGIN', data);
        })
    }
}
