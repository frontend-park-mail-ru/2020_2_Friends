/**
 * Templating html-code using handlebars templater for chat.
 */
export const chatView = () => window.Handlebars.compile(`
<div id="storeHeader" data-storeid="{{storeId}}" class="store__header">
        <div class="store__header-headline">
            <button class="info-button js-to-store-button">К магазину</button>
        </div>
</div>
<div class="chats-scrollable">
<div class="chats-view">
    <div class="chats">
        <div class="search-wrpper"><input class="chats-search input" type="text" placeholder="Поиск" value="">
            <div class="display-none"></div>
        </div>
        <div class="chats-items">
        {{#each chats}}
            <div data-id={{this.order_id}} id="chat-{{order_id}}" class="chats-item">
                <div><img class="chats-item-avatar" src="/assets/img/default-avatar.png" alt="avatar"></div>
                <div>
                    <div class="chats-item-nickname">{{this.interlocutor_name}}</div>
                    <div class="chats-item-last-message">{{this.last_message}}</div>
                </div>
            </div>
        {{/each}}
        </div>
    </div>
    <div class="chat">
        <div class="chat-header">
            <div class="chat-header-nickname">Чат с пользователем</div>
        </div>
        <div class="chat-messages">
        {{#each messages}}
            <div class="chat-message__from-user">
                <div class="chat-message-text__from-user">{{this.text}}</div>
            </div>
        {{/each}}
        </div>
        <div class="chat-new-message"><input class="chat-new-message-input input  js-message-input" type="text"
                placeholder="Напишите сообщение..." value="">
        <button class="new-message-buton proceed-button js-new-message">Отправить</button></div>
    </div>
</div>
</div>
`);

export const messageToUserView = () => window.Handlebars.compile(`
<div class="chat-message__to-user">
    <div class="chat-message-text__to-user">{{text}}</div>
</div>
`);

export const messageFromUserView = () => window.Handlebars.compile(`
<div class="chat-message__from-user">
    <div class="chat-message-text__from-user">{{text}}</div>
</div>
`);
