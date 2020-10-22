export class EventBus {
    /**
     * Eventbus or Eventloop is a container that allows us to fetch M-V-C interaction.
     * It contains a Map [String : Set].
     * EventName (string) - is a key for their event(s).
     * Set - is a set of events for eventName.
     *
     * This class allows subsribe and call methods to interacting with events into one MVC-entity.
     */
    constructor () {
        this.map = new Map();
    }

    /**
     * If there is event in map, adding handler to "Set" object.
     * Otherwise, creating a set object and insert handler into map.
     *
     * @param {string} event - Name of the event. Key in the map.
     * @param {Function} handler - Hadler. It can be invokes by calling his key of the map.
     */
    subscribe (event, handler) {
        let set = new Set();
        if (this.map.has(event)) {
            set = this.map.get(event);
        }
        set.add(handler);
        this.map.set(event, set);
    }

    /**
     * Calling events for passing eventName with or without data.
     *
     * @param {string} event - Subscribed event.
     * @param {object} data - Data contains an object which is passing into event handler function.
     */
    call (event, data) {
        this.map.get(event).forEach((handler, handlerAgain, set) => {
            handler(data);
        });
    }
}
