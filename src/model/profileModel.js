import { userFormValidator } from '../utils/validator.js';
import { regTemplates } from '../utils/reg_templates.js';
import { changePersonalInfoRequest, uploadAvatarRequest, getProfileInfoRequest } from '../utils/ApiService.js';
import { makeAvatarUrl } from '../utils/urlThrottle.js';

export class ProfileModel {
    /**
     * Creating an LoginModel instance.
     *
     * @param {eventBus} eventBus - A container to exchange MVC interactions inside one MVC entity.
     */
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

    /**
     * Getting user profile data with http-request.
     */
    async getProfileData () {
        const response = await getProfileInfoRequest();

        switch (response.status) {
        case 200: {
            const body = await response.json();
            const avatarUrl = makeAvatarUrl(body.avatar);
            this.eventBus.call('SHOW_PROFILE', {
                avatar: avatarUrl,
                points: body.points,
                addresses: body.addresses,
                phone: body.phone,
                username: body.username
            });
            break;
        }
        case 400:
            this.eventBus.call('GET_PROFILE_ERROR');
            break;
        case 500:
            this.eventBus.call('SERVER_INTERNAL_ERROR');
            break;
        default:
            console.log('Backend error');
        }
    }

    /**
     * Uploading to backend fileserver user's avatar picture with http.
     *
     * @param {object} avatar - Form-data with avatar.
     */
    async uploadAvatar (avatar) {
        const response = await uploadAvatarRequest(avatar);

        switch (response.status) {
        case 200: {
            const avatar = await response.json();
            console.log(avatar.avatar);
            const avatarUrl = makeAvatarUrl(avatar.avatar);
            this.eventBus.call('RENDER_AVATAR', { avatarUrl: avatarUrl });
            break;
        }
        case 400:
            // this.eventBus.call('AVATAR_UPLOAD_ERROR');
            break;
        case 500:
            // this.eventBus.call('SERVER_INTERNAL_ERROR');
            break;
        default:
            console.log(`Uncaught backend http-status: ${response.status}`);
        }
    }

    /**
     * Changing user's information in profile.
     * Passing new user's input data to backend server via http.
     *
     * @param {object} input - New user's input data.
     */
    async changePersonalInfo (input) {
        if (this.validate(input)) {
            const response = await changePersonalInfoRequest(input);

            switch (response.status) {
            case 200:
                this.eventBus.call('INFO_CHANGED');
                break;
            case 400:
                this.eventBus.call('CHANGE_PROFILE_ERROR');
                break;
            case 500:
                this.eventBus.call('SERVER_INTERNAL_ERROR');
                break;
            default:
                console.log(`Uncaught backend http-status: ${response.status}`);
            }
        }
    }

    /**
     * Checking user-passed data to pass in into http-request.
     *
     * @param {object} input - User-passed data.
     *
     * @return {boolean} isValid - Result of validating.
     */
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
