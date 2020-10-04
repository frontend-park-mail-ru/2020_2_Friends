export class EventBus {
    constructor () {
        this.map = new Map();
    }

    /**
 * Функция, которая добавляет хендлер в Set, если в map уже есть значение по этому событию.
 * Если события нет, то создает Set и кладет в него хендлер.
 * @param {string} event - имя события. Ключ в map
 * @param {Function} handler - хендлер, который срабатывает, если случится событие event. Добавляется в Set функций
 */
    subscribe (event, handler) {
        let set = new Set();
        if (this.map.has(event)) {
            set = this.map.get(event);
        }
        set.add(handler);
        this.map.set(event, set);
    }

    call (event, data) {
        this.map.get(event).forEach((handler, handlerAgain, set) => {
            handler(data);
        });
    }
}
