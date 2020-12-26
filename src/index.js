import ymaps from 'ymaps';
import './assets/sass/collective.sass';

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
import { ChatController } from './controller/chatController.js';
import { NotificationsController } from './controller/notificationsController.js';

import { Router } from './utils/router.js';
import { routes, mapKey } from './utils/config.js';

const serviceLoad = () => {
    const root = document.getElementById('root');
    const header = document.getElementById('header');
    // Creating router instance and passing it into page's controllers.
    const router = new Router();
    const regController = new RegisterController(root, router);
    const loginController = new LoginController(root, router);
    const headerController = new HeaderController(header, router);
    const chatController = new ChatController(root, router);
    const profileController = new ProfileController(root, router, chatController);
    const storeController = new StoreController(root, router);
    const bucketController = new BucketController(root, router);
    const orderController = new OrderController(root, router);
    const allStoresController = new AllStoresController(root, router);
    const storeReviewsController = new StoreReviewsController(root, router);
    const partnerLoginController = new PartnerLoginController(root, router);
    const partnerRegController = new PartnerRegisterController(root, router);
    const partnerProfileController = new PartnerProfileController(root, router);
    const partnerStoreController = new PartnerStoreController(root, router);
    // eslint-disable-next-line no-unused-vars
    const notificationsController = new NotificationsController(root, router);
    // Setting routes to navigate inside an app.

    function isAdmin () {
        return localStorage.getItem('isAdmin');
    }

    router.setRoute(routes.login, loginController.view.render);
    router.setRoute(routes.register, regController.view.render);
    router.setRoute(routes.profile, () => {
        headerController.model.getHeaderData(isAdmin());
        profileController.model.getProfileData();
    });
    router.setRoute(routes.orders, () => {
        headerController.model.getHeaderData(isAdmin());
        profileController.model.getProfileData('orders');
    });
    router.setRoute(routes.store, () => {
        headerController.model.getHeaderData(isAdmin());
        storeController.model.getData();
    });
    router.setRoute(routes.app, () => {
        headerController.model.getHeaderData(isAdmin());
        allStoresController.model.getStoresData();
    });
    router.setRoute(routes.stores, (id) => {
        headerController.model.getHeaderData(isAdmin());
        storeController.storePageHandler(id);
    });
    router.setRoute(routes.partnersStores, (id) => {
        headerController.model.getHeaderData(isAdmin());
        partnerStoreController.storePageHandler(id);
    });
    router.setRoute(routes.partnersOrders, (id) => {
        headerController.model.getHeaderData(isAdmin());
        orderController.orderPageHandler(id);
    });
    router.setRoute(routes.partnersChats, (id) => {
        headerController.model.getHeaderData(isAdmin());
        chatController.chatPageHandler(id);
    });
    router.setRoute(routes.partnersReviews, (id) => {
        headerController.model.getHeaderData(isAdmin());
        storeReviewsController.reviewsPageHandler(id);
    });
    router.setRoute(routes.storesReviews, (id) => {
        headerController.model.getHeaderData(isAdmin());
        storeReviewsController.reviewsPageHandler(id);
    });
    router.setRoute(routes.bucket, () => {
        headerController.model.getHeaderData(isAdmin());
        bucketController.model.getBucketData();
    });
    // Setting routes for partners to navigate inside an app
    router.setRoute(routes.partnersLogin, partnerLoginController.view.render);
    router.setRoute(routes.partnersRegister, partnerRegController.view.render);
    router.setRoute(routes.partnersProfile, () => {
        headerController.model.getHeaderData(isAdmin());
        partnerProfileController.model.getProfileData();
    });
    router.setRoute(routes.partnersStore, () => {
        headerController.model.getHeaderData(isAdmin());
        partnerStoreController.model.getData();
    });
    headerController.model.socket.connect();

    function getCorrectUrl (redirect = true) {
        const firstSlashIndex = window.location.pathname.indexOf('/') + 1;
        const url = window.location.pathname.slice(firstSlashIndex);
        router.redirect(url, redirect);
    }

    getCorrectUrl();

    window.onpopstate = function () {
        getCorrectUrl(false);
    };
};

ymaps.load(`//api-maps.yandex.ru/2.1/?lang=ru_RU&amp;apikey=${mapKey}`).then(serviceLoad); // eslint-disable-line
