import userHeaderTemplate from '../templates/userHeaderTemplate.hbs';
import adminHeaderTemplate from '../templates/adminHeaderTemplate.hbs';
import notAuthTemplate from '../templates/notAuthTemplate.hbs';

export class HeaderView {
    /**
     * Creating an HeaderView instance.
     * Allows to render Header and response correctly to user's interaction with page.
     *
     * @param {eventBus} eventBus - A container to exchange MVC interactions inside one MVC entity.
     * @param {object} header - Main html div object.
     */
    constructor (header, eventBus) {
        this.header = header;
        this.eventBus = eventBus;
        this.render = this.render.bind(this);
        eventBus.subscribe('SHOW_HEADER', this.render);
    }

    /**
     * Rendering header and setting event listeners.
     */
    render (option) {
        switch (option) {
        case 'user': {
            this.header.innerHTML = userHeaderTemplate();
            this.addUserHeaderEventListeners();
            break;
        }
        case 'admin': {
            this.header.innerHTML = adminHeaderTemplate();
            this.addAdminHeaderEventListeners();
            break;
        }
        case 'notAuth':
        default: {
            this.header.innerHTML = notAuthTemplate();
            this.addNotAuthEventListeners();
            break;
        }
        }
    }

    /**
     * Setting event listeners for header.
     */
    addAdminHeaderEventListeners () {
        const logout = this.header.querySelector('.js-logout-button');
        logout.addEventListener('click', () => this.eventBus.call('LOGOUT'));

        const profile = this.header.querySelector('.js-profile-button');
        profile.addEventListener('click', () => this.eventBus.call('REDIRECT_TO_ADMIN_PROFILE'));

        const storeLogo = this.header.querySelector('.js-goto-searchpage');
        storeLogo.addEventListener('click', () => this.eventBus.call('REDIRECT_TO_ALL_STORES'));
    }

    addUserHeaderEventListeners () {
        const logout = this.header.querySelector('.js-logout-button');
        logout.addEventListener('click', () => this.eventBus.call('LOGOUT'));

        const bucket = this.header.querySelector('.js-bucket-button');
        bucket.addEventListener('click', () => this.eventBus.call('REDIRECT_TO_BUCKET'));

        const profile = this.header.querySelector('.js-profile-button');
        profile.addEventListener('click', () => this.eventBus.call('REDIRECT_TO_PROFILE'));

        const storeLogo = this.header.querySelector('.js-goto-searchpage');
        storeLogo.addEventListener('click', () => this.eventBus.call('REDIRECT_TO_ALL_STORES'));
    }

    addNotAuthEventListeners () {
        const login = this.header.querySelector('.js-login-button');
        login.addEventListener('click', () => this.eventBus.call('REDIRECT_TO_LOGIN'));

        const storeLogo = this.header.querySelector('.js-goto-searchpage');
        storeLogo.addEventListener('click', () => this.eventBus.call('REDIRECT_TO_ALL_STORES'));
    }
}
