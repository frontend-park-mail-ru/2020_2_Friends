import { LoginController } from './controller/loginController.js';
import { ProfileController } from './controller/profileController.js';
import { HeaderController } from './controller/headerController.js';
import { RegisterController } from './controller/registerController.js';
import { StoreController } from './controller/storeController.js';
import { BucketController } from './controller/bucketController.js';
import { OrderController } from './controller/orderController.js';
import { AllStoresController } from './controller/allStoresController.js';
import { StoreReviewsController } from './controller/storeReviewsController.js';
import { PartnerLoginController } from './controller/partnerLoginController.js';
import { PartnerRegisterController } from './controller/partnerRegisterController.js';
import { PartnerProfileController } from './controller/partnerProfileController.js';
import { PartnerStoreController } from './controller/partnerStoreController.js';

import { Router } from './utils/router.js';

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
const orderController = new OrderController(root, router);
const allStoresController = new AllStoresController(root, router);
const storeReviewsController = new StoreReviewsController(root, router);
const partnerLoginController = new PartnerLoginController(root, router);
const partnerRegController = new PartnerRegisterController(root, router);
const partnerProfileController = new PartnerProfileController(root, router);
const partnerStoreController = new PartnerStoreController(root, router);
// Setting routes to navigate inside an app.

function isAdmin () {
    return localStorage.getItem('isAdmin');
}

router.setRoute('^/login/?$', loginController.view.render);
router.setRoute('^/register/?$', regController.view.render);
router.setRoute('^/profile/?$', () => {
    headerController.view.render(isAdmin());
    profileController.model.getProfileData();
});
router.setRoute('^/profile/orders?$', () => {
    headerController.view.render(isAdmin());
    profileController.model.getProfileData('orders');
});
router.setRoute('^/store/?$', () => {
    headerController.view.render(isAdmin());
    storeController.model.getData();
});
router.setRoute('^/?$', () => {
    headerController.view.render(isAdmin());
    allStoresController.model.getStoresData();
});
router.setRoute('^/stores/(?<id>\\d+)/?$', (id) => {
    headerController.view.render(isAdmin());
    storeController.storePageHandler(id);
});
router.setRoute('^/partners_stores/(?<id>\\d+)$', (id) => {
    headerController.view.render(isAdmin());
    partnerStoreController.storePageHandler(id);
});
router.setRoute('^/partners_stores/(?<id>\\d+)/orders/?$', (id) => {
    headerController.view.render(isAdmin());
    orderController.orderPageHandler(id);
});
router.setRoute('^/partners_stores/(?<id>\\d+)/reviews/?$', (id) => {
    headerController.view.render(isAdmin());
    storeReviewsController.reviewsPageHandler(id);
});
router.setRoute('^/stores/(?<id>\\d+)/reviews/?$', (id) => {
    headerController.view.render(isAdmin());
    storeReviewsController.reviewsPageHandler(id);
});
router.setRoute('^/bucket/?$', () => {
    headerController.view.render(isAdmin());
    bucketController.model.getBucketData();
});
// Setting routes for partners to navigate inside an app
router.setRoute('^/partners_login/?$', partnerLoginController.view.render);
router.setRoute('^/partners_register/?$', partnerRegController.view.render);
router.setRoute('^/partners_profile/?$', () => {
    headerController.view.render(isAdmin());
    partnerProfileController.model.getProfileData();
});
router.setRoute('^/partners_store/?$', () => {
    headerController.view.render(isAdmin());
    partnerStoreController.model.getData();
});

function getCorrectUrl (redirect = true) {
    const firstSlashIndex = window.location.pathname.indexOf('/') + 1;
    const url = window.location.pathname.slice(firstSlashIndex);
    router.redirect(url, redirect);
}

getCorrectUrl();

window.onpopstate = function () {
    getCorrectUrl(false);
};
