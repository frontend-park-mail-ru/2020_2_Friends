/**
 * Templating html-code using handlebars templater for order.
 */
export const renderOrderView = () => window.Handlebars.compile(`
<div class="order-cart" id={id}} data-orderId={{id}}>
    <div class="order-cart__header">
        <div class="order-cart__info">
            <a class="order-cart__shop-name" href="#">{{vendor_name}}</a>
            <p class="order-cart__date">{{created_at}}</p>
            <p class="order-cart__address">{{address}}</p>
        </div>
        <div class="order-cart__user-status">{{status}} </div>
    </div>
    <div class="order-cart__order-list">
        {{#each products}}
        <div class="order-list__order-item">
            <div class="order-item__name">{{this.food_name}}</div>
            <div class="order-item__price">{{this.food_price}}</div>
        </div>
        {{/each}}
    </div>
</div>
`);
