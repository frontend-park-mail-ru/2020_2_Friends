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
        this.renderAvatar = this.renderAvatar.bind(this);

        this.addProductEventListeners = this.addProductEventListeners.bind(this);

        eventBus.subscribe('SHOW_STORE', this.render);
        eventBus.subscribe('STORE_DATA_ERROR', this.storeDataError);
        eventBus.subscribe('SERVER_INTERNAL_ERROR', this.serverInternalError);
        eventBus.subscribe('SHOW_NEW_PRODUCT', this.showNewProduct);
        eventBus.subscribe('RENDER_AVATAR', this.renderAvatar);
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

    addProductEventListeners (product) {
        const delBtn = product.querySelector('.js-delete-button');
        delBtn.addEventListener('click', () => {
            const storeId = document.getElementById('storeHeader').dataset.store_id;
            const productId = delBtn.parentNode.parentNode.dataset.product_id;
            const data = { store_id: storeId, product_id: productId };
            this.eventBus.call('DELETE_PRODUCT', data);
            delBtn.parentNode.parentNode.remove();
        });
        const editBtn = product.querySelector('.js-edit-item');
        editBtn.addEventListener('click', () => {
            editBtn.parentNode.style.display = 'none';
            editBtn.parentNode.parentNode.querySelector('.product-editor').style.display = 'flex';
        });

        const saveChangesBtn = product.querySelector('.js-save-item-changes');
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
            const storeHeader = document.getElementById('storeHeader');
            const data = {
                food_name: name.value,
                food_price: price.value,
                food_descr: descr.value,
                food_img: img,
                store_id: storeHeader.dataset.store_id,
                food_id: id
            };
            this.eventBus.call('EDIT_PRODUCT', data);
        });
    }

    showNewProduct (data) {
        const template = renderNewItemView();
        const itemHTML = template(data);
        // передать id нового продукта
        const product = this.root.querySelector('.new-product');
        product.classList.remove('new-product');
        product.innerHTML = itemHTML;
        this.addProductEventListeners(product);
    }

    /**
     * Rendering profile product.
     *
     * @param {object} data - Avatar object, contains avatarUrl to rerender.
     */
    renderAvatar (data) {
        const avatarElement = this.root.querySelector('.product__img');
        avatarElement.src = data.avatarUrl;
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
                const storeHeader = document.getElementById('storeHeader');
                const data = {
                    food_name: name.value,
                    food_price: price.value,
                    food_descr: descr.value,
                    food_img: img,
                    store_id: storeHeader.dataset.store_id,
                    food_id: id
                };
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
                const data = { food_name: name.value, food_price: price.value, food_descr: descr.value, food_img: img, store_id: storeHeader.dataset.store_id };
                this.eventBus.call('CREATE_PRODUCT', data);
            });
        });
    }
};
