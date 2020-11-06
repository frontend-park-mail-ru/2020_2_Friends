/**
 * Templating html-code using handlebars templater for header.
 */
export const renderHeaderView = () => window.Handlebars.compile(`
<img class="header__logo">
<div>
    <button class="header__button js-bucket-button">Корзина</button>
    <button class="header__button js-logout-button">Выйти</button>
</div>
`)