export const renderLoginView = () => window.Handlebars.compile(`
    <div class="login_page">
        <div class="col-container">
            <img src="assets/img/logo.png" class="log_image">
            <div class="form-errors"></div>
            <input type="email" class="js-input-login input_text" placeholder="Логин:">
            <input type="password" class="js-input-password input_text" placeholder="Пароль:">
            <div class="signup">
                <button class="js-reg-button link">Зарегистрироваться</button>
            </div>
            <div>
                <button class="js-submit-login submit_button">Войти</button>
            </div>
        </div>
    </div>`
)
