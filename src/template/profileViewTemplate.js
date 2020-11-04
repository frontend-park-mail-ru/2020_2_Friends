/**
 * Templating html-code using handlebars templater for profile.
 */
export const renderProfileView = () => window.Handlebars.compile(`
<div class="profile-page__background">
<div class="header__background">
    <img class="header__logo">
    <div>
        <button class="header__button">Корзина</button>
        <button class="header__button">Выйти</button>
    </div>
</div>
<div class="profile-page__profile-cart">
    <div class="profile-page__navbar">
        <button class="profile-page__navbar-button profile-page__navbar-button_focus">О Вас</button>
        <button class="profile-page__navbar-button">Адреса</button>
        <button class="profile-page__navbar-button">Мои заказы</button>
        <button class="profile-page__navbar-button">Мои скидки</button>
    </div>
    <div class="profile-page__content">
        <div class="profile-page__left-column">
            <img id="avatar" class="common-image profile-page__img" src="{{ avatar }}">
            <div class="js-avatar-errors"></div>
            <button class="profile-page__img-upload-button">
                <img class="profile-page__img-upload-button-img">
            </button>
            <form class="upload">
            <input type="file" name="uploadFile"  accept=".png, .jpg, .jpeg">
            <input type="submit" />
        </form>
            <div class="profile-page__bonus-points">Количество баллов: {{ points }}</div>
        </div>
        <div class="profile-page__right-column">
            <div class="login-errors text-error"></div>
            <input type="text" class="common-input" placeholder="Логин: {{ username }}" :></input>
            <div class="number-errors text-error"></div>
            <input type="text" class="common-input" placeholder="Номер: {{ phone }}"></input>
            <div class="email-errors text-error"></div>
            <input type="text" class="common-input" placeholder="Email: {{ email }}"></input>
            <button class="proceed-button js-save-info">Сохранить</button>
        </div>
    </div>
</div>
</div>
`)
/* <div class="profile_page_container-column">
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
</div> */
