/**
 * Templating html-code using handlebars templater for store.
 */
export const renderStoreView = () => window.Handlebars.compile(`
<div class="restaraunt_page">
    <div class="store_label">
        <div class="store_logo">
            <img src="assets/store4.png" class="img_logo" alt="Store logo">
        </div>
        <div class="vendor_headline">
            <div class="store_name"> <p> {{ storeName }} </p> </div>
            <div class="store_stats">
                <button class="info_button">Отзывы</button>
                <button class="info_button">Рейтинг</button>
            </div>
        </div>
    </div>
    <div class="showcase">
        {{#each products}}
            <div class="product">
                <div id="food" class="food" title="Обед №1">
                    <img src="{{this.picturePath}}" class="food_img" alt="assets/burger1.png">
                    <div class="food_description"> {{this.foodName}}</div>
                </div>
                <div class="product_price"> {{ this.foodPrice }} 
                    <button class="buy_button">Добавить</button> 
                </div>
            </div>
        {{/each}}
    </div>
</div>
`)
