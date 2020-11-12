/**
 * Templating html-code using handlebars templater for profile.
 */
export const renderProfileView = () => window.Handlebars.compile(`
<div class="background">
    <div class="profile-page__profile-cart">
        <div class="profile-page__navbar">
            <button class="profile-page__navbar-button js-userdata-button link">О Вас</button>
            <button class="profile-page__navbar-button js-mystores-button link">Мои магазины</button>
            <button class="profile-page__navbar-button js-addstore-button link">Добавить магазин</button>
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
                <form class="upload-avatar">
                    <input type="file" name="uploadFile" accept=".png, .jpg, .jpeg">
                    <input type="submit" />
                </form>
            </div>
            <div class="profile-page__right-column">
                <div class="js-login-errors text-error"></div>
                <input type="text" class="common-input js-login-input" placeholder="Имя:" value="{{name}}"></input>
                <div class="js-number-errors text-error"></div>
                <input type="text" class="common-input js-number-input" placeholder="Номер телефона"
                    value="{{phone}}"></input>
                <div class="js-email-errors text-error"></div>
                <button class="proceed-button js-save-info">Сохранить</button>
            </div>
        </div>

        <div class="profile-page__content js-addstore-form">
            <div class="profile-page__left-column">
                <div class="img-container">
                    <img id="avatar" src="assets/img/question.png" alt="Italian Trulli"
                        class="common-image profile-page__img">
                    <div class="avatar-errors"></div>
                </div>
                <button class="profile-page__img-upload-button">
                    <img class="profile-page__img-upload-button-img">
                </button>
                <form class="js-addstore-avatar">
                    <input type="file" name="uploadFile" accept=".png, .jpg, .jpeg">
                    <input type="submit" />
                </form>
            </div>
            <div class="profile-page__right-column">
                <input type="text" class="common-input js-addstore-name" placeholder="Имя магазина:"></input>
                <input type="text" class="common-input  wide-input js-addstore-descr"
                    placeholder="Описание магазина:"></input>
                <button class="proceed-button js-add-store">Создать магазин!</button>
            </div>
        </div>

        <div class="profile-page__content js-mystores">
            <div class="profile-page__content-column">
            {{#each stores}}
                <div class="my-store">
                    <img class="my-store__img" src="{{this.picture}}"></img>
                    <div class="my-store__info">
                        <p class="my-store__name">{{this.store_name}}</p>
                        <p class="my-store__descr">{{this.descr}}</p>
                    </div>
                    <button data-store_id="{{ this.id }}" class="proceed-button js-goto-store my-store__button">Перейти</button>
                </div>
            {{/each}}

            </div>

        </div>
    </div>
</div>
`);
