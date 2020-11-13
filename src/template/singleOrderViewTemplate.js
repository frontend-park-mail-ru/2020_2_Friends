/**
 * Templating html-code using handlebars templater for order.
 */
export const renderOrderView = () => window.Handlebars.compile(`
<div class="order-cart" id={{orderId}} data-orderId={{orderId}}>
    <div class="order-cart__header">
        <img class="order-cart__resto-img" src="img/250px-CycleLayer2.png"></img>
        <div class="order-cart__info">
            <a class="order-cart__shop-name" href="#">Имя магазина</a>
            <p class="order-cart__date">{{date}}</p>
            <p class="order-cart__address">{{address}}</p>
        </div>
        <div class="order-cart__user-status">{{orderStatus}} </div>
    </div>
    <div class="order-cart__order-list">
        {{#each orderItems}}
        <div class="order-list__order-item">
            <div class="order-item__name">{{productName}}</div>
            <div class="order-item__price">{{productPrice}}</div>
        </div>
        {{/each}}
    </div>
</div>
`);
