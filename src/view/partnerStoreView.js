import { renderStoreView } from '../template/partnerStoreViewTemplate.js';
import { renderItemEditView, renderItemNormalView } from '../template/editStoreItemTemplate.js';
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

    showItem () {
        const Id = this.dataset.product_id;
        const ItemBlock = document.getElementById(Id)
        const Template = renderItemNormalView();
        const hTML = Template(ItemBlock.dataset);
        ItemBlock.innerHTML = hTML;
        const saveChanges = ItemBlock.querySelector('.js-edit-item');
        console.log(saveChanges);
        saveChanges.addEventListener('click', this.showItemEditor);
    }

    showItemEditor () {
        const id = this.dataset.product_id;
        const itemBlock = document.getElementById(id);
        const template = renderItemEditView();
        const HTML = template(itemBlock.dataset);
        itemBlock.innerHTML = HTML;
        const saveChanges = itemBlock.querySelector('.js-save-item-changes');
        console.log(saveChanges);
        saveChanges.addEventListener('click', this.showItem);
    }

    addEventListeners () {
        const profile = this.root.querySelector('.js-profile-button');
        profile.addEventListener('click', () => {
            this.eventBus.call('REDIRECT_TO_PROFILE');
        })
        const buttons = this.root.querySelectorAll('.js-edit-item');
        buttons.forEach(element => {
            element.addEventListener('click', this.showItemEditor);
        });
    }
};
