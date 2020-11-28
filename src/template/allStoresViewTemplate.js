export const renderAllStores = () => window.Handlebars.compile(`
<div class="background">
    <div class="stores-page__header">
        <img src="/assets/img/logo.png" class="stores__logo" alt="Store logo">
        <div class="stores-page__header-headline">
            <div class="stores__header">    
                Рестораны
                <form>
                    <input type="text" class="header__input" placeholder="Имя ресторана...">
                </form>
            </div>
            <div class="header__map" id="map"></div>
        </div>
    </div>
    <div class="stores__showcase">
        {{#each stores}}
        <div class="store__block" id="{{ this.id }}">
            <img src="{{ this.picture }}" class="store__img" alt="Фото ресторана">
            <div class="product__info">
                <div class="store-block__store-name"> {{ this.store_name }} </div>
            </div>
            <div class="store__descr"> {{ this.describtion }} </div>
        </div>
        {{/each}}
    </div>
</div>
`);
