import { LoginModel } from '../model/loginModel.js';
import { LoginView } from '../view/loginView.js';

export class LoginController {
    constructor (root) {
        this.model = new LoginModel();
        this.view = new LoginView(root);
    }
}
