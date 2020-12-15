import { userFormValidator } from '../utils/validator.js';
import { regTemplates } from '../utils/reg_templates.js';
import {
    changePersonalInfoRequest,
    uploadAvatarRequest,
    getProfileInfoRequest,
    getUserOrdersDataRequest,
    changeAddressesRequest,
    createReviewRequest
} from '../utils/ApiService.js';
import { makeAvatarUrl } from '../utils/urlThrottle.js';

export class ProfileModel {
    /**
     * Creating an LoginModel instance.
     *
     * @param {eventBus} eventBus - A container to exchange MVC interactions inside one MVC entity.
     */
    constructor (eventBus) {
        this.changePersonalInfo = this.changePersonalInfo.bind(this);
        this.changeAddresses = this.changeAddresses.bind(this);
        this.uploadAvatar = this.uploadAvatar.bind(this);
        this.getProfileData = this.getProfileData.bind(this);
        this.getOrders = this.getOrders.bind(this);
        this.createReview = this.createReview.bind(this);
        this.eventBus = eventBus;
        eventBus.subscribe('CHANGE_INFO', this.changePersonalInfo);
        eventBus.subscribe('CHANGE_ADDRS', this.changeAddresses);
        eventBus.subscribe('VALIDATE', this.validate);
        eventBus.subscribe('UPLOAD_AVATAR', this.uploadAvatar);
        eventBus.subscribe('GET_ORDERS', this.getOrders);
        eventBus.subscribe('CREATE_REVIEW', this.createReview);
    }

    /**
     * Getting user profile data with http-request.
     */
    async getProfileData (subpage = 'profile') {
        const response = await getProfileInfoRequest();

        switch (response.status) {
        case 200: {
            const body = await response.json();
            let avatarUrl;
            if (!body.avatar) {
                avatarUrl = './img/default-avatar.png';
            } else {
                avatarUrl = makeAvatarUrl(body.avatar);
            }
            switch (subpage) {
            case 'profile':
                this.eventBus.call('SHOW_PROFILE', {
                    subpage: 'profile',
                    avatar: avatarUrl,
                    points: body.points,
                    addresses: body.addresses,
                    phone: body.phone,
                    name: body.name
                });
                break;
            case 'orders':
                this.eventBus.call('SHOW_PROFILE', {
                    subpage: 'orders',
                    avatar: avatarUrl,
                    points: body.points,
                    addresses: body.addresses,
                    phone: body.phone,
                    name: body.name
                });
            }
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
            const avatarUrl = makeAvatarUrl(avatar.avatar);
            this.eventBus.call('RENDER_AVATAR', { avatarUrl: avatarUrl });
            break;
        }
        case 400:
            this.eventBus.call('AVATAR_UPLOAD_ERROR');
            break;
        case 500:
            this.eventBus.call('SERVER_INTERNAL_ERROR');
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
            const { name, number } = input;
            const response = await changePersonalInfoRequest({ name: name.value, phone: number.value });

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

    async changeAddresses (input) {
        if (this.validateAddress(input)) {
            const response = await changeAddressesRequest({ addresses: input });

            switch (response.status) {
            case 200:
                this.eventBus.call('SHOW_ADDRESS_LIST', input);
                break;
            case 400:
                this.eventBus.call('CHANGE_ADDRESS_ERROR');
                break;
            case 500:
                this.eventBus.call('SERVER_INTERNAL_ERROR');
                break;
            default:
                console.log(`Uncaught backend http-status: ${response.status}`);
            }
        }
    }

    async getOrders () {
        const response = await getUserOrdersDataRequest();
        switch (response.status) {
        case 200: {
            const body = await response.json();
            this.eventBus.call('SHOW_ORDERS', body);
            break;
        }
        case 400:
            this.eventBus.call('ORDERS_ERROR');
            break;
        case 500:
            this.eventBus.call('SERVER_INTERNAL_ERROR');
            break;
        default:
            console.log(`Uncaught backend http-status: ${response.status}`);
        }
    }

    async createReview (data) {
        const response = await createReviewRequest(data);
        switch (response.status) {
        case 200:
            this.eventBus.call('REVIEW_COMPLETED', data.order_id);
            break;
        case 400:
            this.eventBus.call('REVIEW_ERROR');
            break;
        case 500:
            this.eventBus.call('SERVER_INTERNAL_ERROR');
            break;
        default:
            console.log(`Uncaught backend http-status: ${response.status}`);
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
        const { number } = input;
        let isValid = true;

        const numberValidator = userFormValidator(number, regTemplates.number);
        if (!numberValidator.status) {
            this.eventBus.call('NUMBER_NOT_VALID');
            isValid = false;
        }
        return isValid;
    }

    validateAddress (addresses) {
        let isValid = true;
        addresses.forEach((addr) => {
            const data = { value: addr };
            const addressValidator = userFormValidator(data, regTemplates.address);
            if (!addressValidator.status) {
                isValid = false;
            }
        });
        if (!isValid) {
            this.eventBus.call('ADDRESS_NOT_VALID');
        }
        return isValid;
    }
}
