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
        this.routes = new Map();
        this.redirect = this.redirect.bind(this);
        this.parseUrl = this.parseUrl.bind(this);
    }

    /**
     * Setting rout in app.
     *
     * @param {string} path - Name of resource inside the app.
     * @param {Function} handler - Function that have to be call to show user a "path" page of the app.
     */
    setRoute (path, handler) {
        this.routes.set(path, handler);
    }

    /**
     * Redirecting to named route.
     *
     * @param {string} to - Name of resource to redirect.
     */
    redirect (to, needPushState = true) {
        this.parseUrl();
        if (needPushState) {
            history.pushState({ to }, to, to);
        }
        this.routes.get(to)();
    }

    parseUrl () {
        const url = window.location.pathname;
        const regexp = /(?<mvc>[a-z].*)\/?(?<id>[0-9]+)?/;
        const parsedUrl = url.match(regexp);
        const mvcModule = parsedUrl.groups.mvc;
        const id = parsedUrl.groups.id;
        console.log(mvcModule, id);
    }
}
