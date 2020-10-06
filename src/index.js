import { LoginController } from './controller/loginController.js';
import { RegisterController } from './controller/registerController.js';
import { Router } from './utils/router.js';

const root = document.getElementById('root');

const router = new Router();
const regController = new RegisterController(root, router);
const loginController = new LoginController(root, router);
router.setRoute('register', regController);
loginController.view.render();
