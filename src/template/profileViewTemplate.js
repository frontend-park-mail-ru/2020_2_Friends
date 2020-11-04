/**
 * Templating html-code using handlebars templater for profile.
 */
export const renderProfileView = () => window.Handlebars.compile(`
<div class="profile_page_container-column">
<div class="back_to_restaurants backround_gradient">
    <a class="reference" href="#">Все рестораны</a>
</div>
<div class="profile_page_container">
    <div class="profile_page_data_container backround_gradient">

        <div class="personal-info">
            <h1 class="heading">Личные данные</h1>
            <div class="row_container">
                <div class="img-container">
                    <img id="avatar" src=" {{ avatar }} " alt="Italian Trulli">
                    <div class="avatar-errors"></div>
                </div>
                <form class="upload">
                    <input type="file" name="uploadFile" accept=".png, .jpg, .jpeg">
                    <input type="submit" />
                </form>
                <div class="point_balance"></div>
                <p class="default_text">Количество баллов: {{ points }}</p>
                <a class="reference" href="#">Еда за баллы</a>
            </div>
            <div class="row_container">
                <h2 class="heading">Профиль</h2>
                <div class="login-errors"></div>
                <div class="form_group">
                    <input type="text" class="form_input login-input" placeholder=Логин: {{ name }} required="" />
                </div>
                <div class="number-errors"></div>
                <div class="form_group">
                    <input type="text" class="form_input number-input" placeholder=Номер: {{ number }} required="" />
                </div>
                <div class="email-errors"></div>
                <div class="form_group">
                    <input type="text" class="form_input email-input" placeholder=Email: {{ email }} required="" />
                </div>
                <button class="submit_button save_info">Сохранить</button>
            </div>
            <div class="row_container">
                <h2 class="heading">Адреса</h2>
                <ul class="">
                {{#each address}}
                    <li class="widget_item_container">
                        <p class="default_text">{{this}}</p>
                    </li>
                    {{/each}}
                </ul>
            </div>

            <div class="row_container">
                <h2 class="heading">Настройки</h2>
                <div class="profile-personal_switch">
                    <input type="checkbox" name="switch" class="input--switch">
                    <div class="profile-personal__switch-text">
                        <p class="default_text">Уведомлять об акциях по email</p>
                    </div>
                </div>
                <div class="profile-personal_switch">
                    <input type="checkbox" name="switch" class="input--switch">
                    <div class="profile-personal__switch-text">
                        <p class="default_text">Уведомлять состоянии заказов по смс</p>
                    </div>
                </div>
                <div class="profile-personal_switch">
                    <input type="checkbox" name="switch" class="input--switch">
                    <div class="profile-personal__switch-text">
                        <p class="default_text">Уведомлять об акциях по смс</p>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="profile_page_right_column_container backround_gradient">
        <ul>
            <li class="widget-item_container">
                <button class="js-userdata-button link">Личные данные</button>
            </li>
            <li class="widget-item_container">
                <button class="js-addresses-button link">Адреса доставки</button>
            </li>
            <li class="widget-item_container">
                <button class="js-myorders-button link">Мой заказы</button>
            </li>
            <li class="widget-item_container">
                <button class="js-favstore-button link">Мой избранный магазин</button>
            </li>
            <li class="widget-item_container">
                <button class="js-logout-button link">Выйти!</button>
            </li>
        </ul>

    </div>
</div>
</div>
`)
