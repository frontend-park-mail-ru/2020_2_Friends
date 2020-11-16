/**
 * Templating html-code using handlebars templater for store.
 */
export const renderStoreView = () => window.Handlebars.compile(`
<div class="background">
    <div id="storeHeader" data-store_id="{{storeId}}" class="store__header">
    <div>
        <img src="{{picture}}" class="store__logo" alt="Store logo">
        <form class="upload-logo">
        <input type="file" name="uploadFile" accept=".png, .jpg, .jpeg">
        <input type="submit" />
    </form>
    </form>
    </div>
        <div class="store__header-headline">
            <div class="store__name">{{storeName}}</div>
            <div class="store__functions">
            <button class="info-button">Отзывы</button> 
            <button class="info-button js-goto-orders orders-button">Заказы</button>
            <button class="info-button js-add-item">Добавить блюдо</button>
            </div>
        </div>
    </div>
    <div class="store__showcase js-showcase">
    <div class="js-store-errors"></div>


        {{#each products}}
        <div class="product" id="{{ this.id }}" data-product_id="{{ this.id }}">
            <div class="product-normal" data-product_id="{{ this.id }}">
                <img src="{{ this.picture }}" class="product__img" alt="assets/burger1.png">
                <button class="delete-button js-delete-button" data-product_id="{{ this.id }}"></button>
                <div class="product__info">
                    <div class="product__name"> {{ this.food_name }} </div>
                    <div class="product__price">{{ this.food_price }} p</div>
                    <div class="product__price">{{ this.food_calories }}</div>
                </div>
                <div class="product__descr">{{ this.descr }}</div>
                <button class="proceed-button js-edit-item bottom-center-button"
                    data-product_id="{{ this.id }}">Редактировать</button>
            </div>

            <div class="product-editor" data-product_id="{{ this.id }} id="{{ this.id }}">
                <img src="{{ this.picture }}" class="product__img">
                <form class="product__img-form">
                    <input value={{ this.picture }} id="product__img-form" type="file" name="product__img-form" accept=".png, .jpg, .jpeg">
                </form>
                <button class="delete-button js-delete-button"></button>
                <div>
                    <input type="text" class="common-input js-name-input" placeholder="Название:"
                        value="{{ this.food_name }}"></input>
                    <input type="text" class="common-input  wide-input js-descr-input" placeholder="Описание:"
                        value="{{ this.descr }}"></input>
                    <input type="text" class="common-input  wide-input js-price-input" placeholder="Цена:"
                        value="{{ this.food_price }}"></input>
                    <button
                        class="proceed-button js-save-item-changes bottom-center-button"
                        data-product_id="{{ this.id }}">Сохранить</button>
                </div>
            </div>
        </div>
        {{/each}}

    </div>
</div>`);
