/**
 * Templating html-code using handlebars templater for header.
 */
export const renderUserHeaderView = () => window.Handlebars.compile(`
<header class="header">
<button  class="header__logo-button js-goto-searchpage"><img class="header__logo" src="/assets/img/logo.png"></button>
<div>
    <button class="header__button js-bucket-button">Корзина</button>
    <button class="header__button js-profile-button">Профиль</button>
    <button class="header__button js-logout-button">Выйти</button>
</div>
</header>
`);

/**
 * Templating html-code using handlebars templater for header.
 */
export const renderAdminHeaderView = () => window.Handlebars.compile(`
<header class="header">
<button  class="header__logo-button js-goto-searchpage"><img class="header__logo" src="/assets/img/logo.png"></button>
<div>
    <button class="header__button js-profile-button">Профиль</button>
    <button class="header__button js-logout-button">Выйти</button>
</div>
</header>
`);
