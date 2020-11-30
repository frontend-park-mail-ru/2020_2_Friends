import { renderProfileView } from '../template/profileViewTemplate.js';
import { renderOrderView } from '../template/singleOrderViewTemplate.js';
import { renderAddrListView } from '../template/addresListViewTemplate.js';
export class ProfileView {
    /**
     * Creating an ProfileView instance.
     * Allows to render profile page and response correctly to user's interaction with page.
     *
     * @param {eventBus} eventBus - A container to exchange MVC interactions inside one MVC entity.
     * @param {object} root - Main html div object.
     */
    constructor (root, eventBus) {
        this.root = root;
        this.eventBus = eventBus;

        this.defaultErrorMessage = 'Перезагрузите страницу и попробуйте заново!'; //  TODO: Create exceptions module

        this.loginNotValid = this.loginNotValid.bind(this);
        this.addrNotValid = this.addrNotValid.bind(this);
        this.numberNotValid = this.numberNotValid.bind(this);
        this.infoChanged = this.infoChanged.bind(this);
        this.render = this.render.bind(this);
        this.renderAvatar = this.renderAvatar.bind(this);
        this.avatarUploadError = this.avatarUploadError.bind(this);
        this.serverInternalError = this.serverInternalError.bind(this);
        this.changeProfileError = this.changeProfileError.bind(this);
        this.getProfileError = this.getProfileError.bind(this);
        this.сhangeSubPage = this.changeSubPage.bind(this);
        this.showOrders = this.showOrders.bind(this);
        this.showAddressList = this.showAddressList.bind(this);
        this.reviewCompleted = this.reviewCompleted.bind(this);
        this.closeOverlay = this.closeOverlay.bind(this);
        this.createReview = this.createReview.bind(this);
        eventBus.subscribe('LOGIN_NOT_VALID', this.loginNotValid);
        eventBus.subscribe('NUMBER_NOT_VALID', this.numberNotValid);
        eventBus.subscribe('INFO_CHANGED', this.infoChanged);
        eventBus.subscribe('SHOW_PROFILE', this.render);
        eventBus.subscribe('RENDER_AVATAR', this.renderAvatar);
        eventBus.subscribe('AVATAR_UPLOAD_ERROR', this.avatarUploadError);
        eventBus.subscribe('SERVER_INTERNAL_ERROR', this.serverInternalError);
        eventBus.subscribe('CHANGE_PROFILE_ERROR', this.changeProfileError);
        eventBus.subscribe('GET_PROFILE_ERROR', this.getProfileError);
        eventBus.subscribe('SHOW_ORDERS', this.showOrders);
        eventBus.subscribe('ADDRESS_NOT_VALID', this.addrNotValid);
        eventBus.subscribe('SHOW_ADDRESS_LIST', this.showAddressList);
        eventBus.subscribe('REVIEW_COMPLETED', this.reviewCompleted);
    }

    /**
     * Reacting to get profile error.
     */
    getProfileError () {
        const profileErrors = this.root.querySelector('.avatar-errors');
        profileErrors.innerText = this.defaultErrorMessage;
    }

    /**
     * Reacting to server internal error.
     */
    serverInternalError () {
        const serverErrors = this.root.querySelector('.avatar-errors');
        serverErrors.innerText = 'Упс! Сервер устал, подождите и попробуйте заново!';
    }

    /**
     * Reacting to change profile error.
     */
    changeProfileError () {
        const profileErrors = this.root.querySelector('.avatar-errors');
        profileErrors.innerText = this.defaultErrorMessage;
    }

    /**
     * Reacting to avatar upload error.
     */
    avatarUploadError () {
        const avatarErrors = this.root.querySelector('.avatar-errors');
        avatarErrors.innerText = this.defaultErrorMessage;
    }

    /**
     * Rendering profile page and setting event listeners.
     *
     * @param {object} data - Avatar object, contains avatarUrl to rerender.
     */
    renderAvatar (data) {
        this.avatarElement = this.root.querySelector('#avatar');
        this.avatarElement.src = data.avatarUrl;
    }

    /**
     * Rendering profile page and setting event listeners.
     */
    render (data) {
        const template = renderProfileView();
        this.root.innerHTML = template(data);
        this.changeSubPage(data.subpage);
        this.addEventListeners();
    }

    /**
     * Reacting to login not valid error.
     */
    loginNotValid () {
        const loginErrors = this.root.querySelector('.js-login-errors');
        loginErrors.innerText = 'Имя может содержать только буквы и цифры';
    }

    addrNotValid () {
        const addrErrors = this.root.querySelector('.js-addr-errors');
        addrErrors.innerText = 'Введите корректный адрес!';
    }

    /**
     * Reacting to phone number not valid error.
     */
    numberNotValid () {
        const numberErrors = this.root.querySelector('.js-number-errors');
        numberErrors.innerHTML = 'Номер имеет недопустимый формат!';
    }

    /**
     * Reacting to successful info change.
     */
    infoChanged () {
        const infoText = this.root.querySelector('.js-login-errors');
        infoText.innerText = 'Данные успешно обновлены!';
    }

    changeSubPage (page) {
        const allButtons = this.root.querySelectorAll('.js-userdata-button, .js-addresses-button, .js-coupons-button, .js-myorders-button');
        allButtons.forEach(element => {
            element.classList.remove('profile-page__navbar-button_focus');
        });
        const allBlocks = this.root.querySelectorAll('.js-profile-info, .js-profile-addresses, .js-profile-coupons, .js-profile-orders');
        allBlocks.forEach(element => {
            element.style.display = 'none';
        });
        let seenBlock;
        let activeButton;
        switch (page) {
        case 'profile':
            activeButton = this.root.querySelector('.js-userdata-button');
            seenBlock = this.root.querySelector('.js-profile-info');
            break;

        case 'orders':
            this.eventBus.call('GET_ORDERS');
            activeButton = this.root.querySelector('.js-myorders-button');
            seenBlock = this.root.querySelector('.js-profile-orders');
            break;

        case 'addresses':
            activeButton = this.root.querySelector('.js-addresses-button');
            seenBlock = this.root.querySelector('.js-profile-addresses');
            break;

        case 'coupons':
            activeButton = this.root.querySelector('.js-coupons-button');
            seenBlock = this.root.querySelector('.js-profile-coupons');
            break;

        default:
            activeButton = this.root.querySelector('.js-userdata-button');
            seenBlock = this.root.querySelector('.js-profile-info');
            break;
        }
        seenBlock.style.display = 'flex';
        activeButton.classList.add('profile-page__navbar-button_focus');
    }

    showOrders (data) {
        const orderColumn = document.getElementById('orderColumn');
        orderColumn.innerHTML = '';
        if (data.length === 0) {
            data.empty = 'Что-то тут пустовато... Сделайте свой первый заказ!';
        }
        const template = renderOrderView();
        data.forEach((order) => {
            order.showReview = !order.reviewed && (order.status === 'Завершён');
            order.showChat = !!(order.status && order.status !== 'Завершён');
            const orderHTML = template(order);
            orderColumn.innerHTML += orderHTML;
        });
        const reviewBtns = this.root.querySelectorAll('.js-review-button');
        reviewBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const id = btn.closest('.order-cart').dataset.orderid;
                document.getElementById('review-form').dataset.orderid = id;
                document.getElementById('review_overlay').style.display = 'flex';
            });
        });
        const openSupport = this.root.querySelectorAll('.js-open-support');
        openSupport.forEach(btn => {
            btn.addEventListener('click', () => {
                const id = btn.closest('.order-cart').dataset.orderid;
                const storeName = btn.closest('.order-cart').dataset.name;
                this.eventBus.call('SHOW_USER_CHAT', { order_id: id, store_name: storeName });
            });
        });
    }

    createReview () {
        const id = document.getElementById('review-form').dataset.orderid;
        const rating = document.getElementById('review-form__rating').value;
        const text = document.getElementById('review-form__text').value;
        const data = { order_id: parseInt(id), rating: parseInt(rating), text: text };
        this.eventBus.call('CREATE_REVIEW', data);
    }

    reviewCompleted (id) {
        this.closeOverlay();
        this.thanksForTheReview(id);
    }

    thanksForTheReview (id) {
        const order = document.getElementById(id);
        const reviewBtn = order.querySelector('.js-review-button');
        reviewBtn.classList.toggle('proceed-button');
        reviewBtn.innerHTML = 'Благодарим за отзыв!';
    }

    closeOverlay () {
        document.getElementById('review_overlay').style.display = 'none';
        document.getElementById('review-form__text').value = '';
        document.getElementById('review-form__rating').value = '1';
    }

    showAddressList (input) {
        const addrColumn = document.getElementById('address-column');
        const template = renderAddrListView();
        const addrHTML = template(input);
        addrColumn.innerHTML = addrHTML;
        this.addAddrsEventListeners();
    }

    addAddrsEventListeners () {
        const deleteBtns = this.root.querySelectorAll('.js-delete-address');
        if (!deleteBtns) {
            return;
        }
        deleteBtns.forEach((btn) => {
            btn.addEventListener('click', () => {
                btn.closest('.address-item').remove();
                const oldAddrs = this.root.querySelectorAll('.address-item-text');
                const addrs = [...oldAddrs].map(oldAddr => oldAddr.innerText);
                this.eventBus.call('CHANGE_ADDRS', addrs);
            });
        });
    }

    /**
     * Setting event listeners for profile page.
     */
    addEventListeners () {
        const offOverlay = this.root.querySelector('.js-close-overlay');
        offOverlay.addEventListener('click', this.closeOverlay);

        document.getElementById('js-add-review').addEventListener('click', this.createReview);

        const fileInput = document.getElementById('file');
        document.getElementById('js-upload-avatar').addEventListener('click', (e) => {
            e.preventDefault();
            fileInput.click();
        });

        fileInput.addEventListener('change', () => {
            const file = fileInput.files[0];
            const avatar = new FormData();
            avatar.append('avatar', file);
            this.eventBus.call('UPLOAD_AVATAR', avatar);
        });

        const profileData = this.root.querySelector('.js-userdata-button');
        profileData.addEventListener('click', () => {
            this.changeSubPage('profile');
        });

        const addresses = this.root.querySelector('.js-addresses-button');
        addresses.addEventListener('click', () => {
            this.changeSubPage('addresses');
        });

        const orders = this.root.querySelector('.js-myorders-button');
        orders.addEventListener('click', () => {
            this.changeSubPage('orders');
        });

        const coupons = this.root.querySelector('.js-coupons-button');
        coupons.addEventListener('click', () => {
            this.changeSubPage('coupons');
        });

        const addAddrBtn = this.root.querySelector('.js-add-address');
        addAddrBtn.addEventListener('click', () => {
            const addrsInput = this.root.querySelector('.js-address-input').value;
            const oldAddrs = this.root.querySelectorAll('.address-item-text');
            const addrs = [addrsInput, ...[...oldAddrs].map(oldAddr => oldAddr.innerText)];
            this.eventBus.call('CHANGE_ADDRS', addrs);
        });

        const saveInfo = this.root.querySelector('.js-save-info');
        saveInfo.addEventListener('click', () => {
            const name = this.root.querySelector('.js-login-input');
            const number = this.root.querySelector('.js-number-input');

            const loginErrors = this.root.querySelector('.js-login-errors');
            const numberErrors = this.root.querySelector('.js-number-errors');
            loginErrors.innerText = '';
            numberErrors.innerText = '';
            const data = { name, number };
            this.eventBus.call('CHANGE_INFO', data);
        });

        const back = this.root.querySelector('.back-to-shopping__button');
        back.addEventListener('click', () => {
            this.eventBus.call('REDIRECT_TO_STORES');
        });

        this.addAddrsEventListeners();
    }
}
