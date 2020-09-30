import { templates } from "handlebars"

export class LoginView {
    
    constructor(root) {
        this.root = root
    }

    render() {
        // this.root.innerHTML = '<div>test<div>'
        const temp = templates.Handlebars.templates['login.hbs']

        this.root.innerHTML = temp()
    }
}