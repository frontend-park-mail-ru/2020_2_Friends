import { LoginController } from './controller/loginController.js';
import { Router } from './utils/router.js';

const root = document.getElementById('root');

const router = new Router();
const loginController = new LoginController(root, router)
loginController.view.render();
