/**
 * Templating html-code using handlebars templater for profile.
 */
export const renderProfileView = () => window.Handlebars.compile(`
<div class="background">
    <div class="back-to-shopping">
        <button class="back-to-shopping__button">Все рестораны</button>
    </div>
    <div class="profile-page__profile-cart">
        <div class="profile-page__navbar">
            <button class="profile-page__navbar-button js-userdata-button link">О Вас</button>
            <button class="profile-page__navbar-button js-addresses-button link">Адреса</button>
            <button class="profile-page__navbar-button js-myorders-button link">Мои заказы</button>
            <button class="profile-page__navbar-button js-coupons-button link">Мои скидки</button>
        </div>
        <div class="profile-page__content js-profile-info">
            <div class="profile-page__left-column">
                <div class="img-container">
                    <img id="avatar" src=" {{ avatar }} " alt="Italian Trulli" class="common-image profile-page__img">
                    <div class="avatar-errors"></div>
                    <button id="js-upload-avatar" class="img-upload-button"></button>
                    <input type="file" name="uploadFile" id="file" accept=".png, .jpg, .jpeg"  class="none">
                </div>

                <div class="profile-page__bonus-points">Количество баллов: {{points}}</div>
            </div>
            <div class="profile-page__right-column">
                <div class="js-login-errors text-error"></div>
                <input type="text" class="common-input js-login-input" placeholder="Имя:" value="{{name}}"></input>
                <div class="js-number-errors text-error"></div>
                <input type="text" class="common-input js-number-input" placeholder="Номер телефона:"
                    value="{{phone}}"></input>
                <div class="js-email-errors text-error"></div>
                <button class="proceed-button js-save-info">Сохранить</button>
            </div>
        </div>

        <div class="profile-page__content js-profile-addresses">
            <div class="profile-page__left-column">
                <img class="common-image" src="./assets/img/map.png">
            </div>
            <div class="profile-page__right-column">
                <div id="address-column">
                    <div class="js-addr-errors text-error"></div>
                    {{#each addresses}}
                    <div class="address-item">
                        <div class="address-item-text">{{this}}</div>
                        <div class=" address-delete-butoon round-delete-button js-delete-address"></div>
                    </div>
                    {{/each}}
                </div>
                <div class="add-address-block">
                    <input type="text" class="common-input js-address-input"
                        placeholder="Добавьте новый адрес:"></input>
                    <button class="proceed-button js-add-address">Добавить</button>
                </div>
            </div>
        </div>

        <div class="profile-page__content js-profile-orders">
            <div id="overlay">
            <div id="review-form" class="review-form">
            <div class="review-form__row">
            <div class="review-header__rating">Оцените ваш заказ!</div>
                <select id="review-form__rating" class="review-form__rating">
                    <option value="1" class="status__option">1</option>
                    <option value="2" class="status__option">2</option>
                    <option value="3" class="status__option">3</option>
                    <option value="4" class="status__option">4</option>
                    <option value="5" class="status__option">5</option>
                </select>
                <div class="round-delete-button js-close-overlay"></div>
            </div>
                <textarea id="review-form__text" type="text" cols="20" rows="3" class="common-text-area" placeholder="Расскажите о ваших впечатлениях!"></textarea>
                <button id="js-add-review" class="proceed-button">Добавить отзыв</button>
            </div>
            </div>
            <div class=" order-column-profile " id="orderColumn">

            </div>
        </div>


        <div class="profile-page__content js-profile-coupons">
            <div class="profile-page__content-column">
                <div class="profile-page__сoupon-cart">
                    <p class="profile-page__сoupon-cart-text">Здесь должно быть описание купона и то, как его можно
                        получить.</p>
                    <button class="proceed-button profile-page__сoupon-get-button ">Получить купон</button>
                </div>
                <div class="profile-page__сoupon-cart">
                    <p class="profile-page__сoupon-cart-text">Здесь должно быть описание купона и то, как его можно
                        получить.</p>
                    <button class="proceed-button profile-page__сoupon-get-button ">Получить купон</button>
                </div>
                <div class="profile-page__сoupon-cart">
                    <p class="profile-page__сoupon-cart-text">Здесь должно быть описание купона и то, как его можно
                        получить.</p>
                    <button class="proceed-button profile-page__сoupon-get-button ">Получить купон</button>
                </div>
                <div class="profile-page__сoupon-cart">
                    <p class="profile-page__сoupon-cart-text">Здесь должно быть описание купона и то, как его можно
                        получить.</p>
                    <button class="proceed-button profile-page__сoupon-get-button ">Получить купон</button>
                </div>
                <div class="profile-page__сoupon-cart">
                    <p class="profile-page__сoupon-cart-text">Здесь должно быть описание купона и то, как его можно
                        получить.</p>
                    <button class="proceed-button profile-page__сoupon-get-button ">Получить купон</button>
                </div>
            </div>
        </div>
    </div>
</div>
`);
