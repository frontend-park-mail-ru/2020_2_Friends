import { renderAdminHeaderView, renderUserHeaderView,  renderNotAuthHeaderView } from '../template/headerViewTemplate.js';

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
                const headerTemplate = renderUserHeaderView();
                this.header.innerHTML = headerTemplate();
                this.addUserHeaderEventListeners();
                break;
            }
            case 'admin': {
                const headerTemplate = renderAdminHeaderView();
                this.header.innerHTML = headerTemplate();
                this.addAdminHeaderEventListeners();
                break;
            }
            case 'notAuth': {
                const headerTemplate = renderNotAuthHeaderView();
                this.header.innerHTML = headerTemplate();
                this.addNotAuthEventListeners();
                break;
            }
            default:
                const headerTemplate = renderNotAuthHeaderView();
                this.header.innerHTML = headerTemplate();
                this.addNotAuthEventListeners();
                break;
        }
    }

    /**
     * Setting event listeners for header.
     */
    addAdminHeaderEventListeners () {
        const logout = this.header.querySelector('.js-logout-button');
        logout.addEventListener('click', () => {
            this.eventBus.call('LOGOUT');
        });

        const profile = this.header.querySelector('.js-profile-button');
        profile.addEventListener('click', () => {
            this.eventBus.call('REDIRECT_TO_ADMIN_PROFILE');
        });
    }

    addUserHeaderEventListeners () {
        const logout = this.header.querySelector('.js-logout-button');
        logout.addEventListener('click', () => {
            this.eventBus.call('LOGOUT');
        });

        const bucket = this.header.querySelector('.js-bucket-button');
        bucket.addEventListener('click', () => {
            this.eventBus.call('REDIRECT_TO_BUCKET');
        });

        const profile = this.header.querySelector('.js-profile-button');
        profile.addEventListener('click', () => {
            this.eventBus.call('REDIRECT_TO_PROFILE');
        });
    }
    addNotAuthEventListeners () {
        const login = this.header.querySelector('.js-login-button');
        login.addEventListener('click', () => {
            this.eventBus.call('REDIRECT_TO_LOGIN');
        });
    }
}
