/**
 * Templating html-code using handlebars templater for order.
 */
export const renderOrderView = () => window.Handlebars.compile(`
<div class="background">
    <div id="storeHeader" data-store_id="{{storeId}}" class="store__header">
        <img src="assets/store4.png" class="store__logo" alt="Store logo">
        <div class="store__header-headline">
            <div class="store__name">{{storeName}}</div>
            <button class="info-button js-to-store-button">К магазину</button>
        </div>
    </div>
    <div class="order-column">

        <div class="order-cart">
            <div class="order-cart__header">
                <img class="order-cart__resto-img" src="img/250px-CycleLayer2.png"></img>
                <div class="order-cart__info">
                    <a class="order-cart__shop-name" href="#">Имя магазина</a>
                    <p class="order-cart__date">22.10.2020, 15:29</p>
                    <p class="order-cart__address">Улица Пушкина, дом Кукушкинаaaaaaaaaaaaaaaaaaaaaaaaa</p>
                </div>
                <select class="order-cart__status">
                    <option class="status__option">Новый</option>
                    <option class="status__option">Принят</option>
                    <option class="status__option">Готовится</option>
                    <option class="status__option">Доставка</option>
                    <option class="status__option">Завершён</option>
                </select>
            </div>
            <div class="order-cart__order-list">
                <div class="order-list__order-item">
                    <div class="order-item__name">Название</div>
                    <div class="order-item__price">100 p.</div>
                </div>
                <div class="order-list__order-item">
                    <div class="order-item__name">Название</div>
                    <div class="order-item__price">100 p.</div>
                </div>
                <div class="order-list__order-item">
                    <div class="order-item__name">Название</div>
                    <div class="order-item__price">100 p.</div>
                </div>
                <div class="order-cart__total">
                    <p>Итого:</p>
                    <p>Много рублей</p>
                </div>
            </div>
        </div>

        <div class="order-cart">
            <div class="order-cart__header">
                <img class="order-cart__resto-img" src="img/250px-CycleLayer2.png"></img>
                <div class="order-cart__info">
                    <a class="order-cart__shop-name" href="#">Имя магазина</a>
                    <p class="order-cart__date">22.10.2020, 15:29</p>
                    <p class="order-cart__address">Улица Пушкина, дом Кукушкинаaaaaaaaaaaaaaaaaaaaaaaaa</p>
                </div>
                <select class="order-cart__status">
                    <option class="status__option">Новый</option>
                    <option class="status__option">Принят</option>
                    <option class="status__option">Готовится</option>
                    <option class="status__option">Доставка</option>
                    <option class="status__option">Завершён</option>
                </select>
            </div>
            <div class="order-cart__order-list">
                <div class="order-list__order-item">
                    <div class="order-item__name">Название</div>
                    <div class="order-item__price">100 p.</div>
                </div>
                <div class="order-list__order-item">
                    <div class="order-item__name">Название</div>
                    <div class="order-item__price">100 p.</div>
                </div>
                <div class="order-list__order-item">
                    <div class="order-item__name">Название</div>
                    <div class="order-item__price">100 p.</div>
                </div>
                <div class="order-cart__total">
                    <p>Итого:</p>
                    <p>Много рублей</p>
                </div>
            </div>
        </div>

        <div class="order-cart">
            <div class="order-cart__header">
                <img class="order-cart__resto-img" src="img/250px-CycleLayer2.png"></img>
                <div class="order-cart__info">
                    <a class="order-cart__shop-name" href="#">Имя магазина</a>
                    <p class="order-cart__date">22.10.2020, 15:29</p>
                    <p class="order-cart__address">Улица Пушкина, дом Кукушкинаaaaaaaaaaaaaaaaaaaaaaaaa</p>
                </div>
                <select class="order-cart__status">
                    <option class="status__option">Новый</option>
                    <option class="status__option">Принят</option>
                    <option class="status__option">Готовится</option>
                    <option class="status__option">Доставка</option>
                    <option class="status__option">Завершён</option>
                </select>
            </div>
            <div class="order-cart__order-list">
                <div class="order-list__order-item">
                    <div class="order-item__name">Название</div>
                    <div class="order-item__price">100 p.</div>
                </div>
                <div class="order-list__order-item">
                    <div class="order-item__name">Название</div>
                    <div class="order-item__price">100 p.</div>
                </div>
                <div class="order-list__order-item">
                    <div class="order-item__name">Название</div>
                    <div class="order-item__price">100 p.</div>
                </div>
                <div class="order-cart__total">
                    <p>Итого:</p>
                    <p>Много рублей</p>
                </div>
            </div>
        </div>
    </div>
</div>
`);
