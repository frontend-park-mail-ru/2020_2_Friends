import { LoginController } from './controller/loginController.js';
import { ProfileController } from './controller/profileController.js';
import { RegisterController } from './controller/registerController.js';
import { StoreController } from './controller/storeController.js'
import { Router } from './utils/router.js';

const root = document.getElementById('root');

// Creating router instance and passing it into page's controllers.
const router = new Router();
const regController = new RegisterController(root, router);
const loginController = new LoginController(root, router);
const profileController = new ProfileController(root, router);
const storeController = new StoreController(root, router);

// Setting routes to navigate inside an app.
router.setRoute('register', regController.view.render);
router.setRoute('login', loginController.view.render);
router.setRoute('profile', profileController.model.getProfileData);
router.setRoute('store', storeController.model.getData);
router.setRoute('/', loginController.view.render);
router.setRoute('', loginController.view.render);

router.redirect(window.location.pathname.split('/')[1]);
