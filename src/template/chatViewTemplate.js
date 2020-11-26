/**
 * Templating html-code using handlebars templater for chat.
 */
export const chatView = () => window.Handlebars.compile(`
<div class="chats-view">
    <div class="chats">
        <div class="search-wrpper"><input class="chats-search input" type="text" placeholder="Поиск" value="">
            <div class="display-none"></div>
        </div>
        <div class="chats-items">
            <div data-nickname="qweasd" class="chats-item">
                <div><img class="chats-item-avatar" src="default_avatar.png" alt="avatar"></div>
                <div>
                    <div class="chats-item-nickname">qweasd</div>
                    <div class="chats-item-last-message">hi</div>
                </div>
            </div>
        </div>
    </div>
    <div class="chat">
        <div class="chat-header">
            <div class="chat-header-nickname">@qweasd</div>
        </div>
        <div class="chat-messages">
            <div class="chat-message__from-user">
                <div class="chat-message-text__from-user">hi</div>
            </div>
            <div class="chat-message__from-user">
                <div class="chat-message-text__from-user">hi</div>
            </div>
            <div class="chat-message__from-user">
                <div class="chat-message-text__from-user">hi</div>
            </div>
        </div>
        <div class="chat-new-message"><input class="chat-new-message-input input" type="text"
                placeholder="Напишите сообщение..." value=""><button class="button button--secondary">Отправить</button></div>
    </div>
</div>
`);
