// import { response } from 'express';
import { LoginController } from './controller/loginController.js';
import { ProfileController } from './controller/profileController.js';
import { RegisterController } from './controller/registerController.js';
import { StoreController } from './controller/storeController.js'
import { BucketController } from './controller/bucketController.js'
import { Router } from './utils/router.js';

import { PartnerLoginController } from './controller/partnerLoginController.js';
import { PartnerRegisterController } from './controller/partnerRegisterController.js';
import { PartnerProfileController } from './controller/partnerProfileController.js';
import { PartnerStoreController } from './controller/partnerStoreController.js';
const root = document.getElementById('root');

// Creating router instance and passing it into page's controllers.
const router = new Router();
const regController = new RegisterController(root, router);
const loginController = new LoginController(root, router);
const profileController = new ProfileController(root, router);
const storeController = new StoreController(root, router);
const bucketController = new BucketController(root, router);

const partnerLoginController = new PartnerLoginController(root, router);
const partnerRegController = new PartnerRegisterController(root, router);
const partnerProfileController = new PartnerProfileController(root, router);
const partnerStoreController = new PartnerStoreController(root, router);
// Setting routes to navigate inside an app.
router.setRoute('register', regController.view.render);
router.setRoute('login', loginController.view.render);
router.setRoute('profile', profileController.model.getProfileData);
router.setRoute('store', storeController.model.getData);
router.setRoute('bucket', bucketController.model.getBucketData);
router.setRoute('/', loginController.view.render);
router.setRoute('', loginController.view.render);
// Setting routes for partners to navigate inside an app
router.setRoute('partners', partnerLoginController.view.render);
router.setRoute('partners_register', partnerRegController.view.render);
router.setRoute('partners_profile', partnerProfileController.model.getProfileData);
router.setRoute('partners_store', partnerStoreController.model.getData);

const firstSlashIndex = window.location.pathname.indexOf('/') + 1;
const url = window.location.pathname.slice(firstSlashIndex);
router.redirect(url);

window.onpopstate = function () {
    const firstSlashIndex = window.location.pathname.indexOf('/') + 1;
    const url = window.location.pathname.slice(firstSlashIndex);
    router.redirect(url, false);
}
