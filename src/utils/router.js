import { RegisterController } from '../controller/registerController.js';

export class Router {
    constructor (root) {
        this.root = root;
    }

    redirect (to) {
        switch (to) {
            case 'register':
            const regController = new RegisterController(root, this);
            regController.view.render();
        }
    }
}
