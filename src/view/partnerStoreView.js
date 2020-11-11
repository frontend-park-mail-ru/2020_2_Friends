import { renderStoreView } from '../template/partnerStoreViewTemplate.js';
import { renderItemCreateView, renderNewItemView } from '../template/createStoreItemTemplate.js';
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
        this.showNewProduct = this.showNewProduct.bind(this);
        eventBus.subscribe('SHOW_STORE', this.render);
        eventBus.subscribe('STORE_DATA_ERROR', this.storeDataError);
        eventBus.subscribe('SERVER_INTERNAL_ERROR', this.serverInternalError);
        eventBus.subscribe('SHOW_NEW_PRODUCT', this.showNewProduct);
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

    showNewProduct (data) {
        const template = renderNewItemView();
        const itemHTML = template(data);
        console.log(data);
        // передать id нового продукта
        const newItem = this.root.querySelector('.new-product');
        newItem.classList.remove('new-product');
        newItem.innerHTML = itemHTML;
    }

    addEventListeners () {
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
                const product = saveChangesBtn.parentNode.parentNode.parentNode;
                product.querySelector('.product-normal').style.display = 'flex';

                const name = product.querySelector('.js-name-input');
                const price = product.querySelector('.js-price-input');
                const descr = product.querySelector('.js-descr-input');
                const id = product.dataset.product_id;
                const imgFile = document.getElementById('product__img-form').files[0];
                const img = new FormData();
                img.append('image', imgFile);
                const data = { name: name.value, price: price.value, descr: descr.value, id: id, img: img };
                this.eventBus.call('EDIT_PRODUCT', data);
            });
        });

        const delBtns = this.root.querySelectorAll('.js-delete-button');
        delBtns.forEach(element => {
            element.addEventListener('click', () => {
                const storeId = document.getElementById('storeHeader').dataset.store_id;
                const productId = element.parentNode.parentNode.dataset.product_id;
                const data = { store_id: storeId, product_id: productId };
                this.eventBus.call('DELETE_PRODUCT', data);
                element.parentNode.parentNode.remove();
            });
        });

        const addItemBtn = this.root.querySelector('.js-add-item');
        addItemBtn.addEventListener('click', () => {
            const showcase = this.root.querySelector('.js-showcase');
            const product = document.createElement('div');
            product.className = 'product new-product';
            showcase.insertAdjacentElement('afterbegin', product);
            const template = renderItemCreateView();
            const HTML = template();
            product.innerHTML = HTML;
            const delBtn = product.querySelector('.js-delete-button');
            delBtn.addEventListener('click', () => {
                product.remove();
            });
            // логика добавления товара
            const createBtn = product.querySelector('.js-save-new-item');
            createBtn.addEventListener('click', (e) => {
                const name = product.querySelector('.js-name-input');
                const price = product.querySelector('.js-price-input');
                const descr = product.querySelector('.js-descr-input');
                const imgFile = document.getElementById('product__img-form').files[0];
                const img = new FormData();
                img.append('image', imgFile);
                const storeHeader = document.getElementById('storeHeader');
                const data = { name: name.value, price: price.value, descr: descr.value, img: img, storeId: storeHeader.dataset.store_id };
                this.eventBus.call('CREATE_PRODUCT', data);
            });
        });
    }
};
