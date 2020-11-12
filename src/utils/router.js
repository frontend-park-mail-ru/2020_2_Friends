export class Router {
    /**
     * Creating an instance of router to navigate inside an app.
     * Class contains a Map [ string : Function ] like [ route : handler ], where handler
     * is a function to show user a sought page.
     *
     * @param {object} root - Main html div object.
     */
    constructor (root) {
        this.root = root;
        this.routes = [];
        this.redirect = this.redirect.bind(this);
    }

    /**
     * Setting rout in app.
     *
     * @param {string} regexp - Regular expression of resource inside the app.
     * @param {Function} handler - Function that have to be call to show user a "path" page of the app.
     */
    setRoute (regexp, handler) {
        this.routes.push({ regexp, handler });
    }

    /**
     * Redirecting to named route.
     *
     * @param {string} to - Name of resource to redirect.
     */
    redirect (to, needPushState = true) {
        if (needPushState) {
            if (!to.startsWith('/')) {
                to = '/' + to;
            }
            history.pushState({ to }, to, to);
        }

        const url = window.location.pathname;
        for (const route of this.routes) {
            const regexp = new RegExp(route.regexp);
            if (regexp.test(url)) {
                const parsed = url.match(regexp);
                route.handler(parsed.groups);
                break;
            }
        }
    }
}
