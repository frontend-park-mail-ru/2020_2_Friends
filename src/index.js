import { LoginController } from './controller/loginController.js';
import { ProfileController } from './controller/profileController.js';
import { RegisterController } from './controller/registerController.js';
import { Router } from './utils/router.js';

const root = document.getElementById('root');

const router = new Router();
const regController = new RegisterController(root, router);
const loginController = new LoginController(root, router);
const profileController = new ProfileController(root, router);
router.setRoute('register', regController);
router.setRoute('login', loginController);
router.setRoute('profile', profileController);
//loginController.view.render();
profileController.view.render();
