export class Router {
    constructor (root) {
        this.root = root;
        this.routes = new Map();
        this.redirect = this.redirect.bind(this)
    }

    setRoute (path, handler) {
        this.routes.set(path, handler);
    }

    redirect =(to) => {
        this.routes.get(to)();
    }
}
