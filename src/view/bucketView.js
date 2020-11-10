import { renderBucketView } from '../template/bucketViewTemplate.js';

export class BucketView {
    /**
     * Creating an BucketView instance.
     * @param {eventBus} eventBus - A container to exchange MVC interactions inside one MVC entity.
     * @param {object} root - Main html div object.
     */
    constructor (root, eventBus) {
        this.root = root;
        this.eventBus = eventBus;

        this.render = this.render.bind(this);

        eventBus.subscribe('SHOW_CART', this.render);
    }

    /**
     * Rendering bucket page and setting event listeners.
     * @param {Array} data - Array of cart's items.
     */
    render (data) {
        const template = renderBucketView();
        this.root.innerHTML = template(data);
        this.addEventListeners();
    }

    addEventListeners () {
        const bucket = this.root.querySelector('.js-bucket-button');
        bucket.addEventListener('click', () => {
            this.eventBus.call('REDIRECT_TO_BUCKET');
        })

        const delItemBtn = this.root.querySelectorAll('.js-delete-item')
        delItemBtn.forEach(Btn => {
            Btn.addEventListener('click', () => {
                Btn.parentNode.parentNode.parentNode.style.display = 'none';
            });
        });

        const profile = this.root.querySelector('.js-profile-button');
        profile.addEventListener('click', () => {
            this.eventBus.call('REDIRECT_TO_PROFILE');
        })
    }
}
