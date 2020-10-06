import { renderProfileView } from '../template/profileViewTemplate.js';
// import { getStoreDataRequest } from '../utils/ApiService.js';

export class ProfileView {
    constructor (root, eventBus) {
        this.root = root;
        this.eventBus = eventBus;
    }

    render () {
        const template = renderProfileView();

        // const data = getStoreDataRequest(0);
        const profileHTML = template();
        console.log('111')
        this.root.innerHTML = profileHTML;
    }
}
