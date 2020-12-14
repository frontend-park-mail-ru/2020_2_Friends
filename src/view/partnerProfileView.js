import { MapAPI } from '../utils/mapAPI.js';

import partnerProfileTemplate from '../templates/partnerProfileTemplate.hbs';

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
        this.root.innerHTML = partnerProfileTemplate(data);
        const mapId = this.root.querySelector('#addstore__map');
        this.newMap = new MapAPI({
            div: mapId,
            zoom: 8
        });
        this.newMap.listenClick();
        this.changeSubPage('profile');
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
     * Reacting to successful info change.
     */
    infoChanged () {
        const infoText = this.root.querySelector('.js-login-errors');
        infoText.innerText = 'Данные успешно обновлены!';
    }

    changeSubPage (page) {
        const allButtons = this.root.querySelectorAll('.js-userdata-button, .js-mystores-button, .js-addstore-button');
        allButtons.forEach(element => {
            element.classList.remove('profile-page__navbar-button_focus');
        });
        const allBlocks = this.root.querySelectorAll('.js-profile-info, .js-mystores, .js-addstore-form');
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

        case 'mystores':
            activeButton = this.root.querySelector('.js-mystores-button');
            seenBlock = this.root.querySelector('.js-mystores');
            break;

        case 'addstore':
            activeButton = this.root.querySelector('.js-addstore-button');
            seenBlock = this.root.querySelector('.js-addstore-form');
            break;

        default:
            activeButton = this.root.querySelector('.js-userdata-button');
            seenBlock = this.root.querySelector('.js-profile-info');
            break;
        }
        seenBlock.style.display = 'grid';
        activeButton.classList.add('profile-page__navbar-button_focus');
    }

    /**
     * Setting event listeners for profile page.
     */
    addEventListeners () {
        const storeDataButton = this.root.querySelector('.js-add-store');
        storeDataButton.addEventListener('click', () => {
            const name = this.root.querySelector('.js-addstore-name');
            const description = this.root.querySelector('.js-addstore-descr');
            const radius = this.root.querySelector('.js-addstore-radius');
            const imgFile = document.getElementById('addstore-avatar-form').files[0];
            const img = new FormData();
            img.append('image', imgFile);
            const coords = this.newMap.getCoords();
            const data = { name, description, img, coords, radius };
            this.eventBus.call('ADD_STORE', data);
        });

        const newStoreBtn = document.getElementById('addstore-avatar-form');
        newStoreBtn.addEventListener('change', () => {
            const newStorePic = document.getElementById('newStorePic');
            const imgFile = document.getElementById('addstore-avatar-form').files[0];
            const reader = new FileReader();
            reader.onloadend = function () {
                newStorePic.src = reader.result;
            };
            if (imgFile) { reader.readAsDataURL(imgFile); }
        });

        const profileData = this.root.querySelector('.js-userdata-button');
        profileData.addEventListener('click', () => {
            this.changeSubPage('profile');
        });

        const goToStoreBtns = this.root.querySelectorAll('.js-goto-store');
        goToStoreBtns.forEach(element => {
            element.addEventListener('click', () => {
                const storeId = element.dataset.store_id;
                this.eventBus.call('REDIRECT_TO_STORE_BY_ID', { id: storeId });
            });
        });

        const myStores = this.root.querySelector('.js-mystores-button');
        myStores.addEventListener('click', () => {
            this.changeSubPage('mystores');
        });

        const addStore = this.root.querySelector('.js-addstore-button');
        addStore.addEventListener('click', () => {
            this.changeSubPage('addstore');
        });

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
    }
}
