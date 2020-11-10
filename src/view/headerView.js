import { renderAdminHeaderView, renderUserHeaderView } from '../template/headerViewTemplate.js';

export class HeaderView {
    /**
     * Creating an HeaderView instance.
     * Allows to render Header and response correctly to user's interaction with page.
     *
     * @param {eventBus} eventBus - A container to exchange MVC interactions inside one MVC entity.
     * @param {object} header - Main html div object.
     */
    constructor (header, eventBus) {
        this.header = header
        this.eventBus = eventBus;
    }

    /**
     * Rendering header and setting event listeners.
     */
    render (isAdmin) {
        if (isAdmin) {
            const headerTemplate = renderAdminHeaderView();
            this.header.innerHTML = headerTemplate();
            this.addAdminHeaderEventListeners();
        } else {
            const headerTemplate = renderUserHeaderView();
            this.header.innerHTML = headerTemplate();
            this.addUserHeaderEventListeners();
        }
    }

    /**
     * Setting event listeners for header.
     */
    addAdminHeaderEventListeners () {
        const logout = this.header.querySelector('.js-logout-button');
        logout.addEventListener('click', () => {
            this.eventBus.call('LOGOUT');
        })

        const profile = this.header.querySelector('.js-profile-button');
        profile.addEventListener('click', () => {
            this.eventBus.call('REDIRECT_TO_ADMIN_PROFILE');
        })
    }

    addUserHeaderEventListeners () {
        const logout = this.header.querySelector('.js-logout-button');
        logout.addEventListener('click', () => {
            this.eventBus.call('LOGOUT');
        })

        const bucket = this.header.querySelector('.js-bucket-button');
        bucket.addEventListener('click', () => {
            this.eventBus.call('REDIRECT_TO_BUCKET');
        })

        const profile = this.header.querySelector('.js-profile-button');
        profile.addEventListener('click', () => {
            this.eventBus.call('REDIRECT_TO_PROFILE');
        })
    }
}
