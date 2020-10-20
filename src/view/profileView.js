import { renderProfileView } from '../template/profileViewTemplate.js';

export class ProfileView {
    constructor (root, eventBus) {
        this.root = root;
        this.eventBus = eventBus;
        this.loginNotValid = this.loginNotValid.bind(this);
        this.numberNotValid = this.numberNotValid.bind(this);
        this.emailNotValid = this.emailNotValid.bind(this);
        this.infoChanged = this.infoChanged.bind(this);
        this.render = this.render.bind(this);

        eventBus.subscribe('LOGIN_NOT_VALID', this.loginNotValid);
        eventBus.subscribe('NUMBER_NOT_VALID', this.numberNotValid);
        eventBus.subscribe('EMAIL_NOT_VALID', this.emailNotValid);
        eventBus.subscribe('INFO_CHANGED', this.infoChanged);
    }

    render () {
        const template = renderProfileView();
        const profileHTML = template();

        this.root.innerHTML = profileHTML;
        this.addEventListeners();
    }

    loginNotValid () {
        const loginErrors = this.root.querySelector('.login-errors');
        loginErrors.innerText = 'Имя может содержать только буквы и цифры';
    }

    numberNotValid () {
        const numberErrors = this.root.querySelector('.number-errors');
        numberErrors.innerHTML = 'Номер имеет недопустимый формат!';
    }

    emailNotValid () {
        const emailErrors = this.root.querySelector('.email-errors');
        emailErrors.innerText = 'Поле дожно быть формата something@something.ru';
    }

    infoChanged () {
        const infoText = this.root.querySelector('.login-errors');
        infoText.innerText = 'Данные успешно обновлены!';
    }

    addEventListeners () {
        const favoriteStore = this.root.querySelector('#favorite_store');
        favoriteStore.addEventListener('click', () => {
            this.eventBus.call('REDIRECT_TO_STORE');
        })

        const uploadAvatar = this.root.querySelector('.upload');
        uploadAvatar.addEventListener('submit', (e) => {
            e.preventDefault();
            const file = e.target.uploadFile.files[0];
            const avatar = new FormData();
            avatar.append('avatar', file);
            this.eventBus.call('UPLOAD_AVATAR', avatar);
        })

        const saveInfo = this.root.querySelector('.save_info');
        saveInfo.addEventListener('click', () => {
            const login = this.root.querySelector('.login-input');
            const email = this.root.querySelector('.email-input');
            const number = this.root.querySelector('.number-input');

            const loginErrors = this.root.querySelector('.login-errors');
            const numberErrors = this.root.querySelector('.number-errors');
            const emailErrors = this.root.querySelector('.email-errors');
            loginErrors.innerText = '';
            numberErrors.innerText = '';
            emailErrors.innerText = '';
            const data = { login, number, email };
            this.eventBus.call('CHANGE_INFO', data);
        })
    }
}
