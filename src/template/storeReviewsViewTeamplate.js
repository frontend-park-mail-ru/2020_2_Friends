/**
 * Templating html-code using handlebars templater for store reviews.
 */
export const storeReviewsView = () => window.Handlebars.compile(`
<div class="background">
    <div id="storeHeader" data-storeid="{{storeId}}" class="store__header">
        <img src="{{vendor_picture}}" class="store__logo" alt="Store logo">
        <div class="store__header-headline">
            <div class="store__name">Отзывы о {{vendor_name}}</div>
            <button class="info-button js-to-store-button">К магазину</button>
        </div>
    </div>
    <div class="review-column">
    {{#each reviews}}
    <div class="review-cart">
        <div class="review-cart__review-header">
            <div class="review-header__name">{{this.username}}</div>
            <div class="review-header__date">{{this.created_at}}</div>
            <div class="review-header__rating">Оценка: {{this.rating}}</div>
        </div>
        <div class="review-cart__text">{{this.text}}</div>
    </div>
    {{/each}}
    </div>
</div>
`);
