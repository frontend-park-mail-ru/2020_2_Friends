/**
 * Templating html-code using handlebars templater for bucket.
 */
export const renderBucketView = () => window.Handlebars.compile(`
<div class="background">
    <div class="back-to-shopping">
        <button class="back-to-shopping__button">Все рестораны</button>
    </div>
    <div class="bucket-content">
        <div class="bucket">
            <div class="bucket__header">Моя корзина:</div>
            <div class="empty-bucket">{{empty}}</div>
            {{#each products}}
            <div class="bucket-item" data-id={{this.id}}>
                <img class="bucket-item__img" src="{{this.picture}}"></img>
                <div class="bucket-item__col">
                    <div class="bucket-item__name">{{this.food_name}}</div>
                    <div class="bucket-item__descr">{{this.food_price}} p</div>
                </div>
                <div class="bucket-item__row">
                    <input class="bucket-item__quantity" type="number" value="1">
                    <button class="bucket-item__delete js-delete-item"></button>
                </div>
            </div>
            {{/each}}
        </div>

        <div class="bucket-total">
            <div class="bucket-total__header">Итого:</div>
            <div class="bucket-total__store-name">Выберите адрес:</div>
            <select class="bucket-total__select-address"id="js-address">
                {{#each addresses}}
                <option value="{{this}}" class="status__option">{{this}}</option>
                {{/each}}
            </select>
            <div class="bucket-total__store-name">{{this.store_name}}</div>
            <div class="bucket-total__sum">Сумма заказа: {{total}} p</div>
            <div class="proceed-button bucket-total__order-button js-make-order">Заказать</div>
        </div>
    </div>
</div>
`);
