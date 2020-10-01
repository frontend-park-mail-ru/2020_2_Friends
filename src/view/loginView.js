class LoginViewTemplare {
    static render() {
        return Handlebars.compile(`
            <div class="login_page">
                <div class="col-container">
                    <img src="assets/img/logo.png" class="log_image">
                    <input type="email" class="input_text" placeholder="Логин:">
                    <input type="password" class="input_text" placeholder="Пароль:">
                    <div class="signup">
                        <a href="" class="link">Зарегистрироваться</a>
                    </div>
                    <div>
                        <button class="login">Войти</button>
                    </div>
                </div>
            </div>`
        )
    }
}

export class LoginView {
    
    constructor(root) {
        this.root = root
    }

    render() {
        const template = LoginViewTemplare.render();
        const loginHTML = template();

        this.root.innerHTML = loginHTML
    }
}