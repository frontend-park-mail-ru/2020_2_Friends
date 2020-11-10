/**
 * Templating html-code using handlebars templater for login.
 */
export const renderLoginView = () => window.Handlebars.compile(`
<div class="login-page__background">
    <div class="login-page__input-block">
        <img class="common-image" src="assets/img/logo.png"></img>
        <div class="js-login-errors text-error"></div>
        <input type="text" class="common-input js-input-login" placeholder="Логин:"></input>
        <div class="js-password-errors text-error"></div>
        <input type="text" class="common-input js-input-password" placeholder="Пароль:"></input>
        <button class="proceed-button js-submit-login">Войти</button>
        <button class="js-reg-button link info-button">Зарегистрироваться</button>
    </div>
</div>
`);
