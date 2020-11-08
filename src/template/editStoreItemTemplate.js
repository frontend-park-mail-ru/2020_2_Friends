/**
 * Templating html-code using handlebars templater for store item editing block.
 */
export const renderItemEditView = () => window.Handlebars.compile(`
    <div class="product" id="{{ productId }}">
        <img src="{{ picture }}" class="product__img" alt="assets/burger1.png">
        <button class="delete-button"></button>
        <div>
            <input type="text" class="common-input js-additem-name" placeholder="Название:" value="{{food_name}}"></input>
            <input type="text" class="common-input  wide-input js-additem-descr" placeholder="Описание:" value="{{descr}}"></input>
            <input type="text" class="common-input  wide-input js-additem-price" placeholder="Цена:" value="{{food_price}}"></input>
        <button class="proceed-button js-save-item-changes bottom-center-button" data-product-id="{{ productId }}">Сохранить</button>
    </div>`);

export const renderItemNormalView = () => window.Handlebars.compile(`
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
    </div>`);
