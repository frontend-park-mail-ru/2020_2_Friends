/**
 * Templating html-code using handlebars templater for profile.
 */
export const renderProfileView = () => window.Handlebars.compile(`
    <div class="background">
        <header class="header">
            <img class="header__logo">
            <div>
                <button class="header__button js-bucket-button">Корзина</button>
                <button class="header__button js-profile-button">Профиль</button>
                <button class="header__button js-logout-button">Выйти</button>
            </div>
        </header>
        <div class="back-to-shopping">
        <button class="back-to-shopping__button">Все рестораны</button>
        </div>
        <div class="profile-page__profile-cart">
            <div class="profile-page__navbar">
                <button class="profile-page__navbar-button js-userdata-button link">О Вас</button>
                <button class="profile-page__navbar-button js-addresses-button link">Адреса</button>
                <button class="profile-page__navbar-button js-myorders-button link">Мои заказы</button>
                <button class="profile-page__navbar-button js-favstore-button link">Избранный магазин</button>
                <button class="profile-page__navbar-button js-coupons-button link">Мои скидки</button>
            </div>
            <div class="profile-page__content js-profile-info">
                <div class="profile-page__left-column">
                    <div class="img-container">
                    <img id="avatar" src=" {{ avatar }} " alt="Italian Trulli" class="common-image profile-page__img">
                    <div class="avatar-errors"></div>
                    </div>                    
                    <button class="profile-page__img-upload-button">
                    <img class="profile-page__img-upload-button-img">
                    </button>
                 <form class="upload">
                <input type="file" name="uploadFile" accept=".png, .jpg, .jpeg">
                <input type="submit" />
                </form>

                    <div class="profile-page__bonus-points">Количество баллов: {{points}}</div>
                </div>
                <div class="profile-page__right-column">
                   <div class="js-login-errors text-error"></div>
                    <input type="text" class="common-input js-login-input" placeholder="Имя:" value="{{name}}"></input>
                    <div class="js-number-errors text-error"></div>
                    <input type="text" class="common-input js-number-input" placeholder="Номер телефона:" value="{{phone}}"></input>
                    <div class="js-email-errors text-error"></div>
                    <button class="proceed-button js-save-info">Сохранить</button>
                </div>
            </div>
        
            <div class="profile-page__content js-profile-addresses">
            <div class="profile-page__left-column">
                <img class="common-image" src="./assets/img/map.png">
            </div>
            <div class="profile-page__right-column">
                <div class="profile-page__address-item">
                    <div class="profile-page__address-item-text">
                        Улица Пушкина Дом кукушкина
                    </div>
                    <div class="round-delete-button"></div>
                </div>
                <div class="profile-page__address-item">
                    <div class="profile-page__address-item-text">
                        Улица Пушкина Дом кукушкина
                    </div>
                    <div class="round-delete-button"></div>
                </div>
                <div class="profile-page__address-item">
                    <div class="profile-page__address-item-text">
                        Улица Пушкина Дом кукушкина</div>
                    <div class="round-delete-button"></div>
                </div>
                <div class="profile-page__add-address-block">
                    <input type="text" class="common-input" placeholder="Добавьте новый адрес:"></input>
                    <button class="proceed-button">Добавить</button>
                </div>
            </div>
            </div>

            <div class="profile-page__content js-profile-orders">
            <div class="profile-page__content-column">
                <div class="profile-page__order-cart">
                    <div class="profile-page__order-cart__header">
                        <div class="profile-page__order-cart__order-info">
                            <a class="profile-page__order-cart__shop-name" href="#">Имя магазина</a>
                            <p class="profile-page__order-cart__order-date">22.10.2020, 15:29</p>
                            <p class="profile-page__order-cart__order-address">Улица Пушкина, дом Кукушкинаaaaaaaaaaaaaaaaaaaaaaaaa</p>
                        </div>
                        <img class="profile-page__order-cart-resto-img" src="img/250px-CycleLayer2.png"></img>
                    </div>
                    <div class="profile-page__order-cart__order-list">
                        <div class="profile-page__order-cart__order-item">
                            <div class="profile-page__order-cart__order-item-name">Название</div>
                            <div class="profile-page__order-cart__order-item-price">100 p.</div>
                        </div>
                        <div class="profile-page__order-cart__order-item">
                            <div class="profile-page__order-cart__order-item-name">Название</div>
                            <div class="profile-page__order-cart__order-item-price">100 p.</div>
                        </div>
                        <div class="profile-page__order-cart__order-item">
                            <div class="profile-page__order-cart__order-item-name">Название</div>
                            <div class="profile-page__order-cart__order-item-price">100 p.</div>
                        </div>
                        <div class="profile-page__order-cart__order-item">
                            <div class="profile-page__order-cart__order-item-name">Название</div>
                            <div class="profile-page__order-cart__order-item-price">100 p.</div>
            
                        </div>
                        <div class="profile-page__order-cart__total">
                            <p>Итого:</p>
                            <p>Много рублей</p>
                        </div>
                    </div>
                </div>
            
                <div class="profile-page__order-cart">
                    <div class="profile-page__order-cart__header">
                        <div class="profile-page__order-cart__order-info">
                            <a class="profile-page__order-cart__shop-name" href="#">Имя магазина</a>
                            <p class="profile-page__order-cart__order-date">22.10.2020, 15:29</p>
                            <p class="profile-page__order-cart__order-address">Улица Пушкина, дом Кукушкина</p>
                        </div>
                        <img class="profile-page__order-cart-resto-img" src="250px-CycleLayer2.png"></img>
                    </div>
                    <div class="profile-page__order-cart__order-list">
                        <div class="profile-page__order-cart__order-item">
                            <div class="profile-page__order-cart__order-item-name">Название</div>
                            <div class="profile-page__order-cart__order-item-price">100 p.</div>
                        </div>
                        <div class="profile-page__order-cart__order-item">
                            <div class="profile-page__order-cart__order-item-name">Название</div>
                            <div class="profile-page__order-cart__order-item-price">100 p.</div>
                        </div>
                        <div class="profile-page__order-cart__order-item">
                            <div class="profile-page__order-cart__order-item-name">Название</div>
                            <div class="profile-page__order-cart__order-item-price">100 p.</div>
                        </div>
                        <div class="profile-page__order-cart__order-item">
                            <div class="profile-page__order-cart__order-item-name">Название</div>
                            <div class="profile-page__order-cart__order-item-price">100 p.</div>
            
                        </div>
                        <div class="profile-page__order-cart__total">
                            <p>Итого:</p>
                            <p>Много рублей</p>
                        </div>
                    </div>
                </div>
            </div>
            </div>


            <div class="profile-page__content js-profile-coupons">
            <div class="profile-page__content-column">
                <div class="profile-page__сoupon-cart">
                    <p class="profile-page__сoupon-cart-text">Здесь должно быть описание купона и то, как его можно получить.</p>
                    <button class="proceed-button profile-page__сoupon-get-button ">Получить купон</button>
                </div>
                <div class="profile-page__сoupon-cart">
                    <p class="profile-page__сoupon-cart-text">Здесь должно быть описание купона и то, как его можно получить.</p>
                    <button class="proceed-button profile-page__сoupon-get-button ">Получить купон</button>
                </div>
                <div class="profile-page__сoupon-cart">
                    <p class="profile-page__сoupon-cart-text">Здесь должно быть описание купона и то, как его можно получить.</p>
                    <button class="proceed-button profile-page__сoupon-get-button ">Получить купон</button>
                </div>
                <div class="profile-page__сoupon-cart">
                    <p class="profile-page__сoupon-cart-text">Здесь должно быть описание купона и то, как его можно получить.</p>
                    <button class="proceed-button profile-page__сoupon-get-button ">Получить купон</button>
                </div>
                <div class="profile-page__сoupon-cart">
                    <p class="profile-page__сoupon-cart-text">Здесь должно быть описание купона и то, как его можно получить.</p>
                    <button class="proceed-button profile-page__сoupon-get-button ">Получить купон</button>
                </div>
            </div>
    </div>`);
