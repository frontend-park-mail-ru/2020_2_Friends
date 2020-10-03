import { renderLoginView } from '../template/loginViewTemplate.js';

export class LoginView {
    constructor (root) {
        this.root = root;
    }

    render () {
        const template = renderLoginView();
        const loginHTML = template();

        this.root.innerHTML = loginHTML;
    }
}
