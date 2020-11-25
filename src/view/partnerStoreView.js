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
        this.showChangedProduct = this.showChangedProduct.bind(this);
        this.renderProductImg = this.renderProductImg.bind(this);
        this.renderLogo = this.renderLogo.bind(this);
        this.priceNotValid = this.priceNotValid.bind(this);
        this.addProductEventListeners = this.addProductEventListeners.bind(this);

        eventBus.subscribe('SHOW_STORE', this.render);
        eventBus.subscribe('STORE_DATA_ERROR', this.storeDataError);
        eventBus.subscribe('SERVER_INTERNAL_ERROR', this.serverInternalError);
        eventBus.subscribe('SHOW_NEW_PRODUCT', this.showNewProduct);
        eventBus.subscribe('SHOW_CHANGED_PRODUCT', this.showChangedProduct);
        eventBus.subscribe('RENDER_PRODUCT_IMG', this.renderProductImg);
        eventBus.subscribe('RENDER_LOGO', this.renderLogo);
        this.eventBus.subscribe('PRICE_NOT_VALID', this.priceNotValid);
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

    priceNotValid (id) {
        if (id) {
            const product = document.getElementById(id);
            const priceErr = product.querySelector('.js-price-error');
            priceErr.innerHTML = 'Введите корректную цену!';
        } else {
            const product = this.root.querySelector('.new-product');
            const priceErr = product.querySelector('.js-price-error');
            priceErr.innerHTML = 'Введите корректную цену!';
        }
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
            const productId = delBtn.dataset.product_id;
            const data = { store_id: storeId, product_id: productId };
            this.eventBus.call('DELETE_PRODUCT', data);
            delBtn.closest('.product').remove();
        });
        const editBtn = product.querySelector('.js-edit-item');
        editBtn.addEventListener('click', () => {
            editBtn.parentNode.style.display = 'none';
            editBtn.parentNode.parentNode.querySelector('.product-editor').style.display = 'flex';
        });

        const saveChangesBtn = product.querySelector('.js-save-item-changes');
        saveChangesBtn.addEventListener('click', () => {
            const name = product.querySelector('.js-name-input');
            const price = product.querySelector('.js-price-input');
            const descr = product.querySelector('.js-descr-input');
            const id = product.querySelector('.product-normal').dataset.product_id;
            const imgFile = product.querySelector('input[name="product__img-form"]').files[0];
            let img = null;
            if (imgFile) {
                img = new FormData();
                img.append('image', imgFile);
            }
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
        const product = this.root.querySelector('.new-product');
        product.classList.remove('new-product');
        product.innerHTML = itemHTML;
        product.setAttribute('id', data.food_id);
        const avatarElement = product.querySelector('.product__img');
        if (data.avatarUrl) {
            avatarElement.src = data.avatarUrl;
        }
        this.addProductEventListeners(product);
    }

    showChangedProduct (data) {
        const product = document.getElementById(data.food_id);
        const name = product.querySelector('.product__name');
        const price = product.querySelector('.product__price');
        const descr = product.querySelector('.product__descr');
        const priceErr = product.querySelector('.js-price-error');
        priceErr.innerHTML = '';
        name.innerHTML = data.food_name;
        price.innerHTML = data.food_price;
        descr.innerHTML = data.food_descr;
        if (data.avatarUrl) {
            const avatarElement = product.querySelector('.product__img');
            avatarElement.src = data.avatarUrl;
        }
        product.querySelector('.product-normal').style.display = 'flex';
        product.querySelector('.product-editor').style.display = 'none';
    }

    /**
     * Rendering profile product.
     *
     * @param {object} data - Avatar object, contains avatarUrl to rerender.
     */
    renderProductImg (data) {
        const avatarElement = this.root.querySelector('.product__img');
        avatarElement.src = data.avatarUrl;
    }

    renderLogo (data) {
        const avatarElement = this.root.querySelector('.store__logo');
        avatarElement.src = data.avatarUrl;
    }

    addEventListeners () {
        const reviews = this.root.querySelector('.js-goto-reviews');
        const storeId = document.getElementById('storeHeader').dataset.store_id;
        reviews.addEventListener('click', () => {
            this.eventBus.call('REDIRECT_TO_REVIEWS', storeId);
        });
        const fileInput = document.getElementById('file');
        document.getElementById('js-upload-avatar').addEventListener('click', (e) => {
            e.preventDefault();
            fileInput.click();
        });
        fileInput.addEventListener('change', () => {
            const file = fileInput.files[0];
            const avatar = new FormData();
            avatar.append('image', file);
            const storeId = document.getElementById('storeHeader').dataset.store_id;
            const data = { avatar, storeId };
            this.eventBus.call('UPLOAD_STORE_LOGO', data);
        });

        const products = this.root.querySelectorAll('.product');
        products.forEach(product => { this.addProductEventListeners(product); });

        const toOrdersBtn = this.root.querySelector('.js-goto-orders');
        toOrdersBtn.addEventListener('click', () => {
            this.eventBus.call('REDIRECT_TO_ORDERS', storeId);
        });
        const addItemBtn = this.root.querySelector('.js-add-item');
        addItemBtn.addEventListener('click', () => {
            const showcase = this.root.querySelector('.js-showcase');
            const product = document.createElement('div');
            product.className = 'product new-product';
            showcase.insertAdjacentElement('afterbegin', product);
            const template = renderItemCreateView();
            product.innerHTML = template();
            const delBtn = product.querySelector('.js-delete-button');
            delBtn.addEventListener('click', () => {
                product.remove();
            });
            const createBtn = product.querySelector('.js-save-new-item');
            createBtn.addEventListener('click', (e) => {
                const name = product.querySelector('.js-name-input');
                const price = product.querySelector('.js-price-input');
                const descr = product.querySelector('.js-descr-input');
                const imgFile = document.getElementById('product__img-form').files[0];
                let img;
                if (imgFile) {
                    img = new FormData();
                    img.append('image', imgFile);
                } else {
                    img = null;
                }
                const storeHeader = document.getElementById('storeHeader');
                const data = { food_name: name.value, food_price: parseInt(price.value), food_descr: descr.value, food_img: img, store_id: storeHeader.dataset.store_id };
                this.eventBus.call('CREATE_PRODUCT', data);
            });
        });
    }
};
