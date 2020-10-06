// import { LoginController } from './controller/loginController.js';
import { StoreController } from './controller/storeController.js';
// import { ProfileController } from './controller/profileController.js';

const root = document.getElementById('root');

// const loginController = new LoginController(root);
// loginController.view.render();
const storeController = new StoreController(root);
storeController.view.render();
// const profileController = new ProfileController(root);
// profileController.view.render();
