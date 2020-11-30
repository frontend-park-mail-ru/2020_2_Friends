import { userFormValidator } from '../utils/validator.js';
import { regTemplates } from '../utils/reg_templates.js';
import { changePersonalInfoRequest, uploadAvatarRequest, getProfileInfoRequest, getPartnersStoresRequest, addStore, changeStoreImgRequest } from '../utils/ApiService.js';
import { makeAvatarUrl } from '../utils/urlThrottle.js';

export class PartnerProfileModel {
    /**
     * Creating an LoginModel instance.
     *
     * @param {eventBus} eventBus - A container to exchange MVC interactions inside one MVC entity.
     */
    constructor (eventBus) {
        this.changePersonalInfo = this.changePersonalInfo.bind(this);
        this.uploadAvatar = this.uploadAvatar.bind(this);
        this.getProfileData = this.getProfileData.bind(this);
        this.addStore = this.addStore.bind(this);

        this.eventBus = eventBus;
        eventBus.subscribe('CHANGE_INFO', this.changePersonalInfo);
        eventBus.subscribe('UPLOAD_AVATAR', this.uploadAvatar);
        eventBus.subscribe('REDIRECT_TO_STORE', (storeId) => this.router.redirect('/stores/' + storeId));
        eventBus.subscribe('ADD_STORE', this.addStore);
    }

    async addStore (data) {
        const { name, description, radius, coords } = data;
        const geoData = coords.split(',');
        const distance = parseInt(radius.value);
        const response = await addStore({
            store_name: name.value,
            description: description.value,
            distance: distance,
            longitude: parseFloat(geoData[1]),
            latitude: parseFloat(geoData[0])
        }
        );
        switch (response.status) {
        case 200: {
            const body = await response.json();
            const imgInput = { storeId: body.id, avatar: data.img };
            const imgResponse = await changeStoreImgRequest(imgInput);
            if (imgResponse.status === 200) {
                this.eventBus.call('REDIRECT_TO_STORE_BY_ID', { id: body.id });
            }
            break;
        }
        case 500:
            this.eventBus.call('SERVER_INTERNAL_ERROR');
            break;
        default:
            console.log(`Uncaught backend http-status: ${response.status}`);
        }
    }

    /**
     * Getting user profile data with http-request.
     */
    async getProfileData () {
        const response = await getProfileInfoRequest();
        switch (response.status) {
        case 200: {
            const responseStores = await getPartnersStoresRequest();
            if (responseStores.status !== 200) {
                break;
            }
            const stores = await responseStores.json();
            stores.forEach((store) => {
                store.picture = makeAvatarUrl(store.picture);
            });
            const body = await response.json();
            const avatarUrl = body.avatar ? makeAvatarUrl(body.avatar) : '../assets/img/default-avatar.png';
            this.eventBus.call('SHOW_PROFILE', {
                avatar: avatarUrl,
                points: body.points,
                addresses: body.addresses,
                phone: body.phone,
                name: body.name,
                stores: stores
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
}
