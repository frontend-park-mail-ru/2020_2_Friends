/**
 * Templating html-code using handlebars templater for store.
 */
export const renderStoreView = () => window.Handlebars.compile(`
<div class="background">
    <div class="back-to-shopping">
        <button class="back-to-shopping__button">Все рестораны</button>
    </div>
    <div class="store__header">
        <img src="http://89.208.197.247:9001/data/img/{{picture}}" class="store__logo" alt="Store logo">
        <div class="store__header-headline">
            <div class="store__name">{{storeName}}</div>
            <button class="info-button">Отзывы</button>
        </div>
    </div>
    <div class="store__showcase">
        <div class="js-store-errors"></div>

        {{#each products}}
        <div class="product-normal product" id="{{ this.id }}">
            <img src="http://89.208.197.247:9001/data/img/{{ this.picture }}" class="product__img" alt="assets/burger1.png">
            <div class="product__info">
                <div class="product__name"> {{ this.food_name }} </div>
                <div class="product__price">{{ this.food_price }}</div>
                <div class="product__price">{{ this.food_calories }}</div>
            </div>
            <div class="product__descr">Описание вкусного обеда, которым можно насытиться и получить витамины и
                минералы.</div>
            <button class="proceed-button js-add-to-cart" data-product-id="{{ this.id }}">В корзину</button>
        </div>
        {{/each}}

    </div>
</div>
`);
