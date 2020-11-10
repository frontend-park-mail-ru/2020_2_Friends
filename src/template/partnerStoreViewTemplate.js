/**
 * Templating html-code using handlebars templater for store.
 */
export const renderStoreView = () => window.Handlebars.compile(`
<div class="background">
    <div class="header">
        <img class="header__logo" src="/assets/img/logo.png">
        <div>
            <button class="header__button js-profile-button">Профиль</button>
            <button class="header__button">Выйти</button>
        </div>
    </div>
    <div class="store__header">
        <img src="assets/store4.png" class="store__logo" alt="Store logo">
        <div class="store__header-headline">
            <div class="store__name">{{storeName}}</div>
            <button class="info-button">Отзывы</button>
            <button class="proceed-button js-add-item">Добавить блюдо</button>
        </div>
    </div>
    <div class="store__showcase js-showcase">
        <div class="js-store-errors"></div>

        {{#each products}}
        <div class="product">
            <div class="product-normal">
                <img src="{{ this.picture }}" class="product__img" alt="assets/burger1.png">
                <button class="delete-button js-delete-button"></button>
                <div class="product__info">
                    <div class="product__name"> {{ this.food_name }} </div>
                    <div class="product__price">{{ this.food_price }}</div>
                    <div class="product__price">{{ this.food_calories }}</div>
                </div>
                <div class="product__descr">{{ this.descr }}</div>
                <button class="proceed-button js-edit-item bottom-center-button"
                    data-product_id="{{ this.id }}">Редактировать</button>
            </div>

            <div class="product-editor" id="{{ this.id }}">
                <img src="{{ this.picture }}" class="product__img">
                <form id="product__upload-img" class="product__upload-img">
                    <input type="file" name="uploadFile" accept=".png, .jpg, .jpeg">
                </form>
                <button class="delete-button js-delete-button"></button>
                <div>
                    <input type="text" class="common-input js-additem-name" placeholder="Название:"
                        value="{{ this.food_name }}"></input>
                    <input type="text" class="common-input  wide-input js-additem-descr" placeholder="Описание:"
                        value="{{ this.descr }}"></input>
                    <input type="text" class="common-input  wide-input js-additem-price" placeholder="Цена:"
                        value="{{ this.food_price }}"></input>
                    <input type="submit" form="product__upload-img" value=Сохранить
                        class="proceed-button js-save-item-changes bottom-center-button"
                        data-product_id="{{ this.id }}">
                </div>
            </div>
        </div>
        {{/each}}

    </div>
</div>`);
