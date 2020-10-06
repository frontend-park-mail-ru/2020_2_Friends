export const renderRegisterView = () => window.Handlebars.compile(`
    <div class="login_page">
        <div class="col-container">
            <img src="assets/img/logo.png" class="log_image">
            <input type="email" class="js-input-login input_text" placeholder="Логин:">
            <input type="password" class="js-input-password input_text" placeholder="Пароль:">
            <input type="password" class="js-input-password-second input_text" placeholder="Повторите пароль:">
            <div>
                <button class="js-submit-reg submit_button">Зарегистрироваться</button>
            </div>
        </div>
    </div>`
)
