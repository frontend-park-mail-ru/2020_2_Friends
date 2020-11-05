import { renderProfileView, renderProfileMain, renderProfileAddresses, renderProfileOrders, renderProfileCoupons } from '../template/profileViewTemplate.js';

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
        this.numberNotValid = this.numberNotValid.bind(this);
        this.emailNotValid = this.emailNotValid.bind(this);
        this.infoChanged = this.infoChanged.bind(this);
        this.render = this.render.bind(this);
        this.renderAvatar = this.renderAvatar.bind(this);
        this.avatarUploadError = this.avatarUploadError.bind(this);
        this.serverInternalError = this.serverInternalError.bind(this);
        this.changeProfileError = this.changeProfileError.bind(this);
        this.getProfileError = this.getProfileError.bind(this);

        eventBus.subscribe('LOGIN_NOT_VALID', this.loginNotValid);
        eventBus.subscribe('NUMBER_NOT_VALID', this.numberNotValid);
        eventBus.subscribe('EMAIL_NOT_VALID', this.emailNotValid);
        eventBus.subscribe('INFO_CHANGED', this.infoChanged);
        eventBus.subscribe('SHOW_PROFILE', this.render);
        eventBus.subscribe('RENDER_AVATAR', this.renderAvatar);
        eventBus.subscribe('AVATAR_UPLOAD_ERROR', this.avatarUploadError);
        eventBus.subscribe('SERVER_INTERNAL_ERROR', this.serverInternalError);
        eventBus.subscribe('CHANGE_PROFILE_ERROR', this.changeProfileError);
        eventBus.subscribe('GET_PROFILE_ERROR', this.getProfileError);
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
        const profileHTML = template(data);

        this.root.innerHTML = profileHTML;
        this.addEventListeners();
    }

    /**
     * Rendering profile sub-page and setting event listeners.
     */
    showProfilePage (data, template) {
        const profileHTML = template(data);
        const profileCart = this.root.querySelector('.profile-page__profile-cart');
        profileCart.innerHTML = profileHTML;
        this.addEventListeners();
    }

    /**
     * Reacting to login not valid error.
     */
    loginNotValid () {
        const loginErrors = this.root.querySelector('.js-login-errors');
        loginErrors.innerText = 'Имя может содержать только буквы и цифры';
    }

    /**
     * Reacting to phone number not valid error.
     */
    numberNotValid () {
        const numberErrors = this.root.querySelector('.js-number-errors');
        numberErrors.innerHTML = 'Номер имеет недопустимый формат!';
    }

    /**
     * Reacting to email not valid error.
     */
    emailNotValid () {
        const emailErrors = this.root.querySelector('.js-email-errors');
        emailErrors.innerText = 'Поле дожно быть формата something@something.ru';
    }

    /**
     * Reacting to successful info change.
     */
    infoChanged () {
        const infoText = this.root.querySelector('.js-login-errors');
        infoText.innerText = 'Данные успешно обновлены!';
    }

    /**
     * Setting event listeners for profile page.
     */
    addEventListeners () {
        const favoriteStore = this.root.querySelector('.js-favstore-button');
        favoriteStore.addEventListener('click', () => {
            this.eventBus.call('REDIRECT_TO_STORE');
        })

        const profileData = this.root.querySelector('.js-userdata-button');
        profileData.addEventListener('click', () => {
            const data = {};
            this.showProfilePage(data, renderProfileMain());
        })

        const addresses = this.root.querySelector('.js-addresses-button');
        addresses.addEventListener('click', () => {
            const data = {};
            this.showProfilePage(data, renderProfileAddresses());
        })

        const orders = this.root.querySelector('.js-myorders-button');
        orders.addEventListener('click', () => {
            const data = {};
            this.showProfilePage(data, renderProfileOrders());
        })

        const coupons = this.root.querySelector('.js-coupons-button');
        coupons.addEventListener('click', () => {
            const data = {};
            this.showProfilePage(data, renderProfileCoupons());
        })

        const logout = this.root.querySelector('.js-logout-button');
        logout.addEventListener('click', () => {
            this.eventBus.call('REDIRECT_TO_LOGOUT');
        })

        const bucket = this.root.querySelector('.js-bucket-button');
        bucket.addEventListener('click', () => {
            this.eventBus.call('REDIRECT_TO_BUCKET');
        })

        const uploadAvatar = this.root.querySelector('.upload');
        uploadAvatar.addEventListener('submit', (e) => {
            e.preventDefault();
            const file = e.target.uploadFile.files[0];
            const avatar = new FormData();
            avatar.append('avatar', file);
            this.eventBus.call('UPLOAD_AVATAR', avatar);
        })

        const saveInfo = this.root.querySelector('.js-save-info');
        saveInfo.addEventListener('click', () => {
            const login = this.root.querySelector('.js-login-input');
            const email = this.root.querySelector('.js-email-input');
            const number = this.root.querySelector('.js-number-input');

            const loginErrors = this.root.querySelector('.js-login-errors');
            const numberErrors = this.root.querySelector('.js-number-errors');
            const emailErrors = this.root.querySelector('.js-email-errors');
            loginErrors.innerText = '';
            numberErrors.innerText = '';
            emailErrors.innerText = '';
            const data = { login, number, email };
            this.eventBus.call('CHANGE_INFO', data);
        })
    }
}
