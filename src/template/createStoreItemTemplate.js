/**
 * Templating html-code using handlebars templater for store item editing block.
 */

export const renderItemCreateView = () => window.Handlebars.compile(`
<div class="product-normal"><img src="assets/img/question.png" class="product__img">
    <form  class="product__img-form">
        <input id="product__img-form" type="file" name="uploadFile" accept=".png, .jpg, .jpeg">
    </form>
    <button class="delete-button js-delete-button"></button>
    <div class="product__items-input">
        <input type="text" class="common-input js-name-input" placeholder="Название:"></input>
        <input type="text" class="common-input  wide-input js-descr-input" placeholder="Описание:"></input>
        <div class="js-price-error text-error"></div>
        <input type="text" class="common-input  wide-input js-price-input" placeholder="Цена:"></input>
        <div>
            <button class="proceed-button js-save-new-item bottom-center-button">Создать</button>
        </div>
    </div>
</div>
`);

export const renderNewItemView = () => window.Handlebars.compile(`
<div class="product-normal" data-product_id="{{ food_id }}">
<img src="{{ picture }}" class="product__img">
    <button class="delete-button js-delete-button" data-product_id="{{ food_id }}"></button>
    <div class="product__info">
        <div class="product__name"> {{ food_name }} </div>
        <div class="product__price">{{ food_price }} p</div>
        <div class="product__price">{{ food_calories }}</div>
    </div>
    <div class="product__descr">{{ descr }}</div>
    <button class="proceed-button js-edit-item bottom-center-button" data-product_id="{{ food_id }}">Редактировать</button>
</div>

<div class="product-editor" data-product_id="{{ food_id }}">
    <img src="{{ picture }}" class="product__img">
    <form class="product__img-form">
        <input value={{ picture }} id="product__img-form" type="file" name="product__img-form" accept=".png, .jpg, .jpeg">
    </form>
    <button class="delete-button js-delete-button" data-product_id="{{ food_id }}"></button>
    <div>
        <input type="text" class="common-input js-name-input" placeholder="Название:" value="{{ food_name }}"></input>
        <input type="text" class="common-input  wide-input js-descr-input" placeholder="Описание:" value="{{ descr }}"></input>
        <div class="js-price-error text-error"></div>
        <input type="text" class="common-input  wide-input js-price-input" placeholder="Цена:" value="{{ food_price }}"></input>
        <button class="proceed-button js-save-item-changes bottom-center-button" data-product_id="{{ id }}">Сохранить</button>
    </div>
</div>
`);
