/**
 * Templating html-code using handlebars templater for register.
 */
export const renderRegisterView = () => window.Handlebars.compile(`
    <div class="login_page">
        <div class="col-container">
            <img src="assets/img/logo.png" class="log_image">
            <div class="login-errors"></div>
            <input type="email" class="js-input-login input_text" placeholder="Логин:">
            <div class="email-errors"></div>
            <input type="email" class="js-input-email input_text" placeholder="Email:">
            <div class="password-errors"></div>
            <input type="password" class="js-input-password input_text" placeholder="Пароль:">
            <input type="password" class="js-input-password-second input_text" placeholder="Повторите пароль:">
            <div>
                <button class="js-submit-reg submit_button">Зарегистрироваться</button>
            </div>
        </div>
    </div>`
)
