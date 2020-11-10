/**
 * Templating html-code using handlebars templater for store item editing block.
 */

export const renderItemCreateView = () => window.Handlebars.compile(`
<div class="product-normal"><img src="assets/img/question.png" class="product__img">
        <form id="product__upload-img" class="product__upload-img">
        <input type="file" name="uploadFile" accept=".png, .jpg, .jpeg">
    </form>
        <button class="delete-button js-delete-button"></button>
        <div class="product__items-input">
            <input type="text" class="common-input js-additem-name" placeholder="Название:"></input>
            <input type="text" class="common-input  wide-input js-additem-descr" placeholder="Описание:"></input>
            <input type="text" class="common-input  wide-input js-additem-price" placeholder="Цена:"></input>
            <div>
        <input type="submit" form="product__upload-img"  value="Создать" class="proceed-button js-save-new-item bottom-center-button"><div>`);
