import { renderProfileView } from '../template/partnerProfileViewTemplate.js';

export class PartnerProfileView {
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
        this.infoChanged = this.infoChanged.bind(this);
        this.render = this.render.bind(this);
        this.renderAvatar = this.renderAvatar.bind(this);
        this.avatarUploadError = this.avatarUploadError.bind(this);
        this.serverInternalError = this.serverInternalError.bind(this);
        this.changeProfileError = this.changeProfileError.bind(this);
        this.getProfileError = this.getProfileError.bind(this);
        this.changeSubPage = this.changeSubPage.bind(this);

        eventBus.subscribe('LOGIN_NOT_VALID', this.loginNotValid);
        eventBus.subscribe('NUMBER_NOT_VALID', this.numberNotValid);
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
        console.log(data);
        this.root.innerHTML = profileHTML;
        this.addEventListeners();
        this.changeSubPage('.js-profile-info');
        this.focusOnNavButton('.js-userdata-button');
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
     * Reacting to successful info change.
     */
    infoChanged () {
        const infoText = this.root.querySelector('.js-login-errors');
        infoText.innerText = 'Данные успешно обновлены!';
    }

    changeSubPage (selector) {
        const seenBlock = this.root.querySelector(selector);
        const allBlocks = this.root.querySelectorAll('.js-profile-info, .js-mystores, .js-addstore-form');
        allBlocks.forEach(element => {
            element.style.display = 'none';
        });
        seenBlock.style.display = 'flex';
    }

    focusOnNavButton (selector) {
        const seenBlock = this.root.querySelector(selector);
        const allBlocks = this.root.querySelectorAll('.js-userdata-button, .js-mystores-button, .js-addstore-button');
        allBlocks.forEach(element => {
            element.classList.remove('profile-page__navbar-button_focus');
        });
        seenBlock.classList.add('profile-page__navbar-button_focus');
    }

    /**
     * Setting event listeners for profile page.
     */
    addEventListeners () {
        const profileData = this.root.querySelector('.js-userdata-button');
        profileData.addEventListener('click', () => {
            this.changeSubPage('.js-profile-info');
            this.focusOnNavButton('.js-userdata-button');
        })

        const myStores = this.root.querySelector('.js-mystores-button');
        myStores.addEventListener('click', () => {
            this.changeSubPage('.js-mystores');
            this.focusOnNavButton('.js-mystores-button');
        })

        const addStore = this.root.querySelector('.js-addstore-button');
        addStore.addEventListener('click', () => {
            this.changeSubPage('.js-addstore-form');
            this.focusOnNavButton('.js-addstore-button');
        })

        const logout = this.root.querySelector('.js-logout-button');
        logout.addEventListener('click', () => {
            this.eventBus.call('REDIRECT_TO_LOGOUT');
        })

        const profile = this.root.querySelector('.js-profile-button');
        profile.addEventListener('click', () => {
            this.eventBus.call('REDIRECT_TO_PROFILE');
        })

        const uploadAvatar = this.root.querySelector('.upload-avatar');
        uploadAvatar.addEventListener('submit', (e) => {
            e.preventDefault();
            const file = e.target.uploadFile.files[0];
            const avatar = new FormData();
            avatar.append('avatar', file);
            this.eventBus.call('UPLOAD_AVATAR', avatar);
        })

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
        })
    }
}
