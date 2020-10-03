import { LoginController } from './controller/loginController.js';

const root = document.getElementById('root');

const loginController = new LoginController(root)
loginController.view.render();
