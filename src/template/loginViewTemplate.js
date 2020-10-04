export const renderLoginView = () => window.Handlebars.compile(`
    <div class="login_page">
        <div class="col-container">
            <img src="assets/img/logo.png" class="log_image">
            <input type="email" class="js-input-login" placeholder="Логин:">
            <input type="password" class="js-input-password" placeholder="Пароль:">
            <div class="signup">
                <a href="" class="link">Зарегистрироваться</a>
            </div>
            <div>
                <button class="js-submit-login">Войти</button>
            </div>
        </div>
    </div>`
)
