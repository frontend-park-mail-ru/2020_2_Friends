/**
 * Templating html-code using handlebars templater for order.
 */
export const renderOrderView = () => window.Handlebars.compile(`
<div class="background">
    <div id="storeHeader" data-storeid="{{storeId}}" class="store__header">
        <img src="{{picture}}" class="store__logo" alt="Store logo">
        <div class="store__header-headline">
            <div class="store__name">{{vendor_name}}</div>
            <button class="info-button js-to-store-button">К магазину</button>
        </div>
    </div>
    <div class="order-column">
        {{#each orders}}
        <div class="order-cart" id={{this.id}} data-orderId={{this.id}}>
            <div class="order-cart__header">
                <div class="order-cart__info">
                    <a class="order-cart__shop-name" href="#">{{this.vendor_name}}</a>
                    <p class="order-cart__date">{{this.created_at}}</p>
                    <p class="order-cart__address">{{this.address}}</p>
                </div>
                <select class="order-cart__status">
                    <option value="Новый" class="status__option">Новый</option>
                    <option value="Принят" class="status__option">Принят</option>
                    <option value="Готовится" class="status__option">Готовится</option>
                    <option value="Доставка" class="status__option">Доставка</option>
                    <option value="Завершён" class="status__option">Завершён</option>
                </select>
            </div>
            <div class="order-cart__order-list">
            {{#each this.products}}
                <div class="order-list__order-item">
                    <div class="order-item__name">{{this.food_name}}</div>
                    <div class="order-item__price">{{this.food_price}}</div>
                </div>
            {{/each}}
            </div>
        </div>
        {{/each}}

    </div>
</div>
`);
