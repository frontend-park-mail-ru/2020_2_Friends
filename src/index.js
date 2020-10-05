import { LoginController } from './controller/loginController.js';
// import { ProfileController } from './controller/profileController.js';

const root = document.getElementById('root');

const loginController = new LoginController(root);
// const profileController = new ProfileController(root);
loginController.view.render();
// profileController.view.render();
