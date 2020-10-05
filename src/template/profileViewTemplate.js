export const renderProfieView = () => window.Handlebars.compile(`<div class="profile_page_container-column">
<div class="back_to_restaurants backround_gradient">
    <a class="reference" href="#">Все рестораны</a>
</div>
<div class="profile_page_container">
    <div class="profile_page_data_container backround_gradient">

        <div class="personal-info">
            <h1 class="heading">Личные данные</h1>
            <div class="row_container">
                <div class="point_balance"></div>
                <p class="default_text">Количество баллов</p>
                <a class="reference" href="#">Еда за баллы</a>
            </div>
            <div class="row_container">
                <h2 class="heading">Профиль</h2>
                <div class="form_group">
                    <input type="text" class="form_input" placeholder="Имя" required="" />
                </div>
                <div class="form_group">
                    <input type="text" class="form_input" placeholder="Телефон" required="" />
                </div>
                <div class="form_group">
                    <input type="text" class="form_input" placeholder="Email" required="" />
                </div>
            </div>
            <div class="row_container">
                <h2 class="heading">Адреса</h2>
                <ul class="">
                    <li class="widget_item_container">
                        <p class="default_text">Улица пушкина дом кукушниа</p>
                    </li>
                    <li class="widget_item_container">
                        <p class="default_text">Мой адрес - Советский Союз!)))))))))))))</p>
                    </li>
                    <li class="widget_item_container">
                        <p class="default_text">Идите.. . на стук сердца.. . Не слышите ?..Тогда, зачем вам мой адрес ?..)</p>
                    </li>
                    <li class="widget_item_container">
                        <p class="default_text">Обычно в Москве, но последнее время все чаще в интернете</p>
                    </li>
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
                <a class="reference" href="/profile/personal" class="widget-item__link">
                    <p class="default_text">Личные данные</p>
                </a>
            </li>
            <li class="widget-item_container">
                <a class="reference" href="/profile/addresses" class="widget-item__link">
                    <p class="default_text">Адреса доставки</p>
                </a>
            </li>
            <li class="widget-item_container">
                <a class="reference" href="#" class="widget-item__link">
                    <p class="default_text">Мои заказы</p>
                </a>
            </li>
            <li class="widget-item_container">
                <a class="reference" href="/profile/mydiscounts" class="widget-item__link">
                    <p class="default_text">Мои скидки</p>
                </a>
            </li>
            <li class="widget-item_container">
                <a class="reference" href="/logout" class="widget-item__link">
                    <p class="default_text">Выход</p>
                </a>
            </li>
        </ul>

    </div>
</div>
</div>`)
