/**
 * Templating html-code using handlebars templater for store.
 */
export const renderStoreView = () => window.Handlebars.compile(`
<div class="background">
<div class="header">
    <img class="header__logo">
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
<div class="store__showcase">
<div class="js-store-errors"></div>

{{#each products}}
    <div class="product" id="{{ this.id }}" data-product-id="{{ this.id }}"
    data-food_name="{{this.food_name}}" data-food_price="{{this.food_price}}" data-desrc="{{this.descr}}" data-picture="{{ this.picture }}">
        <img src="{{ this.picture }}" class="product__img" alt="assets/burger1.png">
        <button class="delete-button"></button>
        <div class="product__info">
            <div class="product__name"> {{ this.food_name }} </div>
            <div class="product__price">{{ this.food_price }}</div>
            <div class="product__price">{{ this.food_calories }}</div>
        </div>
        <div class="product__descr">{{ this.descr }}</div>
        <button class="proceed-button js-edit-item bottom-center-button" data-product_id="{{ this.id }}">Редактировать</button>
        </div>
{{/each}}

</div>
</div>`);
