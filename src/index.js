// import { response } from 'express';
import { LoginController } from './controller/loginController.js';
import { ProfileController } from './controller/profileController.js';
import { HeaderController } from './controller/headerController.js';
import { RegisterController } from './controller/registerController.js';
import { StoreController } from './controller/storeController.js';
import { BucketController } from './controller/bucketController.js';
import { Router } from './utils/router.js';

import { PartnerLoginController } from './controller/partnerLoginController.js';
import { PartnerRegisterController } from './controller/partnerRegisterController.js';
import { PartnerProfileController } from './controller/partnerProfileController.js';
import { PartnerStoreController } from './controller/partnerStoreController.js';

const root = document.getElementById('root');
const header = document.getElementById('header');
// Creating router instance and passing it into page's controllers.
const router = new Router();
const regController = new RegisterController(root, router);
const loginController = new LoginController(root, router);
const headerController = new HeaderController(header, router);
const profileController = new ProfileController(root, router);
const storeController = new StoreController(root, router);
const bucketController = new BucketController(root, router);

const partnerLoginController = new PartnerLoginController(root, router);
const partnerRegController = new PartnerRegisterController(root, router);
const partnerProfileController = new PartnerProfileController(root, router);
const partnerStoreController = new PartnerStoreController(root, router);
// Setting routes to navigate inside an app.
router.setRoute('^$', loginController.view.render);
router.setRoute('^/$', loginController.view.render);
router.setRoute('^/login$', loginController.view.render);
router.setRoute('^/register$', regController.view.render);
router.setRoute('^/profile$', () => {
    headerController.view.render(false);
    profileController.model.getProfileData();
});
router.setRoute('^/store$', () => {
    headerController.view.render(false);
    storeController.model.getData();
});
router.setRoute('^/stores/(?<id>\\d+)$', (id) => {
    headerController.view.render(true);
    storeController.storePageHandler(id);
});
router.setRoute('^/partners_stores/(?<id>\\d+)$', (id) => {
    headerController.view.render(true);
    partnerStoreController.storePageHandler(id);
});
router.setRoute('^/bucket$', () => {
    headerController.view.render(false);
    bucketController.model.getBucketData();
});
// Setting routes for partners to navigate inside an app
router.setRoute('^/partners_login$', partnerLoginController.view.render);
router.setRoute('^/partners_register$', partnerRegController.view.render);
router.setRoute('^/partners_profile$', () => {
    headerController.view.render(true);
    partnerProfileController.model.getProfileData();
});
router.setRoute('^/partners_store$', () => {
    headerController.view.render(true);
    partnerStoreController.model.getData();
});

const firstSlashIndex = window.location.pathname.indexOf('/') + 1;
const url = window.location.pathname.slice(firstSlashIndex);
router.redirect(url);

window.onpopstate = function () {
    const firstSlashIndex = window.location.pathname.indexOf('/') + 1;
    const url = window.location.pathname.slice(firstSlashIndex);
    router.redirect(url, false);
};
