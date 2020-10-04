export class EventBus {
    constructor () {
        this.map = new Map();
    }

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
