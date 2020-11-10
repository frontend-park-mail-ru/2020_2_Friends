import { renderStoreView } from '../template/partnerStoreViewTemplate.js';
import { renderItemCreateView } from '../template/editStoreItemTemplate.js';
export class PartnerStoreView {
    /**
     * Creating an PartnerStoreView instance.
     * Allows to render store page for its owner and response correctly to user's interaction with page.
     *
     * @param {eventBus} eventBus - A container to exchange MVC interactions inside one MVC entity.
     * @param {object} root - Main html div object.
     */
    constructor (root, eventBus) {
        this.root = root;
        this.eventBus = eventBus;

        this.render = this.render.bind(this);
        this.storeDataError = this.storeDataError.bind(this);
        this.serverInternalError = this.serverInternalError.bind(this);

        eventBus.subscribe('SHOW_STORE', this.render);
        eventBus.subscribe('STORE_DATA_ERROR', this.storeDataError);
        eventBus.subscribe('SERVER_INTERNAL_ERROR', this.serverInternalError);
    }

    /**
     * Reacting to internal server error.
     */
    serverInternalError () {
        const serverErrors = this.root.querySelector('.js-store-errors');
        serverErrors.innerHTML = 'Упс! Сервер устал, подождите и попробуйте заново!';
    }

    /**
     * Reacting to failed getting store data.
     */
    storeDataError () {
        const storeErrors = this.root.querySelector('.js-store-errors');
        storeErrors.innerHTML = 'Произошла ошибка при загрузке данных магазина!';
    }

    /**
     * Rendering register page and setting event listeners.
     */
    render (data) {
        const template = renderStoreView();
        const storeHTML = template(data);
        this.root.innerHTML = storeHTML;
        this.addEventListeners();
    }

    addEventListeners () {
        const profile = this.root.querySelector('.js-profile-button');
        profile.addEventListener('click', () => {
            this.eventBus.call('REDIRECT_TO_PROFILE');
        })

        const editBtns = this.root.querySelectorAll('.js-edit-item');
        editBtns.forEach(editBtn => {
            editBtn.addEventListener('click', () => {
                editBtn.parentNode.style.display = 'none';
                editBtn.parentNode.parentNode.querySelector('.product-editor').style.display = 'flex';
            });
        });

        const saveChangesBtns = this.root.querySelectorAll('.js-save-item-changes');
        saveChangesBtns.forEach(saveChangesBtn => {
            saveChangesBtn.addEventListener('click', () => {
                saveChangesBtn.parentNode.parentNode.style.display = 'none';
                saveChangesBtn.parentNode.parentNode.parentNode.querySelector('.product-normal').style.display = 'flex';
            });
        });

        const delBtns = this.root.querySelectorAll('.js-delete-button');
        delBtns.forEach(element => {
            element.addEventListener('click', () => {
                element.parentNode.remove();
                // УДАЛЕНИЕ НА БЕКЕ
            })
        });
        const addItemBtn = this.root.querySelector('.js-add-item');
        addItemBtn.addEventListener('click', () => {
            const showcase = this.root.querySelector('.js-showcase');
            const product = document.createElement('div');
            product.className = 'product';
            showcase.insertAdjacentElement('afterbegin', product);
            const template = renderItemCreateView();
            const HTML = template();
            product.innerHTML = HTML;
            const delBtn = product.querySelector('.js-delete-button');
            delBtn.addEventListener('click', () => {
                product.remove();
            })
        })
    }
};
