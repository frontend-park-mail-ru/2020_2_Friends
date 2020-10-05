// import { LoginController } from './controller/loginController.js';
import { StoreController } from './controller/storeController.js';

const root = document.getElementById('root');

// const loginController = new LoginController(root);
// loginController.view.render();
const storeController = new StoreController(root);
storeController.view.render();
