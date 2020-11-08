/**
 * Templating html-code using handlebars templater for bucket.
 */
export const renderBucketView = () => window.Handlebars.compile(`
<div class="bucket__background">
<header class="header__background">
    <img class="header__logo">
    <div>
        <button class="header__button">Корзина</button>
        <button class="header__button">Выйти</button>
    </div>
</header>
<div class="bucket-content">
    <div class="bucket">
        <div class="bucket__header">Моя корзина:</div>

        {{#each products}}
        <div class="bucket-item">
            <img class="bucket-item__img" src="{{this.picture}}"></img>
            <div class="bucket-item__col">
                <div class="bucket-item__name">{{this.food_name}}</div>
                <div class="bucket-item__descr">{{this.food_price}}</div>
            </div>
            <div class="bucket-item__col">
                <div class="bucket-item__row">
                    <input class="bucket-item__quantity" type="number" value="{{this.food_price}}">
                    <button class="bucket-item__delete"></button>
                </div>
                <div class="bucket-item__price">{{this.food_price}}</div>
            </div>
        </div>
        {{/each}}
    </div>
    
    <div class="bucket-total">
        <div class="bucket-total__header">Итого:</div>
        <div class="bucket-total__store-name">{{this.store_name}}</div>
        <div class="bucket-total__sum">Сумма заказа:{{total}}</div>
        <div class="proceed-button bucket-total__order-button">Заказать</div>
    </div>
</div>
</div>
`)
