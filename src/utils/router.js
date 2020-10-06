export class Router {
    constructor (root) {
        this.root = root;
        this.routes = new Map();
    }

    setRoute (path, controller) {
        console.log('set route')
        this.routes.set(path, controller);
    }

    redirect (to) {
        this.routes.get(to).view.render();
    }
}
