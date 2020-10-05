import { RouterStore } from '../store/routes.js';
import { Request } from '../managers/request/request.js';

export class ModelUser {
    constructor(attrs = null, isLoaded = false, eventBus) {
        const defaults = {
            id: null,
            username: null,
            email: null,
        };

        this.attrs = {...defaults, ...attrs };
        this.isLoaded = isLoaded;
        this.eventBus = eventBus;

        eventBus.subscribe('ADD_ADDRESS', this.doLogin);
        eventBus.subscribe('ADD_AVATAR', this.doLogin);
        eventBus.subscribe('ADD_NUMBER', this.doLogin);
        eventBus.subscribe('ADD_NUMBER', this.doLogin);
    }

    get(key, defaultv) {
        const spl = key.split('.');

        let result = this.attrs;
        for (let i = 0; i < spl.length; i++) {
            const tempKey = spl[i];
            result = result[tempKey];

            if (result === undefined) {
                return defaultv;
            }

            if (result === null) {
                return defaultv || result;
            }
        }
        return result;
    }

    update(attrs) {
        this.attrs = Object.assign(this.attrs, attrs);
    }

    static getCurrentUser() {
        return new Promise((resolve) => {
            const url = RouterStore.api.user.current;
            let user;
            Request.get(url).then((res) => {
                const { body, status } = res;
                if (status === 200) {
                    user = new ModelUser(body.data.user, true);
                } else {
                    user = new ModelUser();
                }
                resolve(user);
            });
        });
    }
}
