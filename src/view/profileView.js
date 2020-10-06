import { renderProfileView } from '../template/profileViewTemplate.js';
import { userFormValidator } from '../utils/validator.js';
import { regTemplates } from '../utils/reg_templates.js';

export class ProfileView {
    constructor (root, eventBus) {
        this.root = root;
        this.eventBus = eventBus;
    }

    render () {
        const template = renderProfileView();
        const profileHTML = template({
            name: 'Ксюша',
            points: '100',
            email: 'qqqq',
            number: '888',
            address: [
                'address1',
                'address2',
                'address3',
                'address4'
            ]
        });

        this.root.innerHTML = profileHTML;
        this.addEventListeners();
    }

    addEventListeners () {
        const favoriteStore = this.root.querySelector('#favorite_store');
        const saveInfo = this.root.querySelector('.save_info');
        favoriteStore.addEventListener('click', () => {
            this.eventBus.call('REDIRECT_TO_STORE');
        })

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
            let isValid = true;

            const loginValidator = userFormValidator(login, regTemplates.username, 'Имя может содержать только буквы и цифры');
            if (!loginValidator.status) {
                loginErrors.innerText = loginValidator.message;
                isValid = false;
            }

            const numberValidator = userFormValidator(number, regTemplates.number, 'Номер имеет недопустимый формат!');
            if (!numberValidator.status) {
                numberErrors.innerHTML = numberValidator.message;
                isValid = false;
            }
            const emailValidator = userFormValidator(email, regTemplates.email, 'Поле дожно быть формата something@something.ru');
            if (!emailValidator.status) {
                emailErrors.innerText = emailValidator.message;
                isValid = false;
            }
            if (isValid) {
                // ОТПРАВКА ДАННЫХ ТУТ!
            }
        })
    }
}
