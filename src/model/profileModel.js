import { userFormValidator } from '../utils/validator.js';
import { regTemplates } from '../utils/reg_templates.js';
import { changePersonalInfoRequest, uploadAvatarRequest, pullAvatarRequest, getProfileInfoRequest } from '../utils/ApiService.js';
import { makeAvatarUrl } from '../utils/urlThrottle.js';
export class ProfileModel {
    constructor (eventBus) {
        this.changePersonalInfo = this.changePersonalInfo.bind(this);
        this.uploadAvatar = this.uploadAvatar.bind(this);
        this.getProfileData = this.getProfileData.bind(this);

        this.eventBus = eventBus;
        eventBus.subscribe('LOGOUT', this.logOut);
        eventBus.subscribe('CHANGE_INFO', this.changePersonalInfo);
        eventBus.subscribe('VALIDATE', this.validate);
        eventBus.subscribe('UPLOAD_AVATAR', this.uploadAvatar);
    }

    async getProfileData () {
        const response = await getProfileInfoRequest();
        const body = await response.json();
        const avatarUrl = makeAvatarUrl(body.avatar);
        this.eventBus.call('SHOW_PROFILE', { avatar: avatarUrl });
    }

    async uploadAvatar (avatar) {
        const response = await uploadAvatarRequest(avatar);
        console.log(response);
    }

    async changePersonalInfo (input) {
        const name = '9ymaN9cx3CuwQnphJvupUj.jpeg';
        const ava = await pullAvatarRequest(name);
        console.log(ava);
        if (this.validate(input)) {
            console.log(input);
            const response = await changePersonalInfoRequest(input);
            if (response.status === 200) {
                console.log(response);
                this.eventBus.call('INFO_CHANGED');
            }
        }
        console.log('changePersonalInfo');
    }

    validate (input) {
        const { login, number, email } = input;
        let isValid = true;
        const loginValidator = userFormValidator(login, regTemplates.username);
        if (!loginValidator.status) {
            this.eventBus.call('LOGIN_NOT_VALID');
            isValid = false;
        }

        const numberValidator = userFormValidator(number, regTemplates.number);
        if (!numberValidator.status) {
            this.eventBus.call('NUMBER_NOT_VALID');
            isValid = false;
        }
        const emailValidator = userFormValidator(email, regTemplates.email);
        if (!emailValidator.status) {
            this.eventBus.call('EMAIL_NOT_VALID');
            isValid = false;
        }
        return isValid;
    }

    logOut (input) {
        console.log('logOut');
    }
}
