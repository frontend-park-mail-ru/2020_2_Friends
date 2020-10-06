export class Router {
    constructor (root) {
        this.root = root;
        this.routes = new Map();
        this.redirect = this.redirect.bind(this)
    }

    setRoute (path, controller) {
        this.routes.set(path, controller);
    }

    redirect (to) {
        this.routes.get(to).view.render();
    }
}
