/**
 * Templating html-code using handlebars templater for store.
 */
export const renderStoreView = () => window.Handlebars.compile(`
<div class="background">
<div class="header">
    <img class="header__logo">
    <div>
        <button class="header__button js-bucket-button">Корзина</button>
        <button class="header__button js-profile-button">Профиль</button>
        <button class="header__button">Выйти</button>
    </div>
</div>
<div class="back-to-shopping">
    <button class="back-to-shopping__button">Все рестораны</button>
</div>
<div class="store__header">
    <img src="assets/store4.png" class="store__logo" alt="Store logo">
    <div class="store__header-headline">
        <div class="store__name">{{storeName}}</div>
        <button class="info-button">Отзывы</button>
    </div>
</div>
<div class="store__showcase">
<div class="js-store-errors"></div>

{{#each products}}
    <div class="product" id="{{ this.id }}">
        <img src="{{ this.picture }}" class="product__img" alt="assets/burger1.png">
        <div class="product__info">
            <div class="product__name"> {{ this.food_name }} </div>
            <div class="product__price">{{ this.food_price }}</div>
            <div class="product__price">{{ this.food_calories }}</div>
        </div>
        <div class="product__descr">Описание вкусного обеда, которым можно насытиться и получить витамины и минералы.</div>
        <button class="proceed-button" data-product-id="{{ this.id }}">В корзину</button>
    </div>
{{/each}}

</div>
</div>`);
