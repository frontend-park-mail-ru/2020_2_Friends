export class MapAPI {
    constructor (params) {
        this.coord = [55.75, 37.62];
        this.zoom = params.zoom;
        this.mapId = params.div;
        this.myPlacemark = null;
        this.map = null;

        this.init();
        this.listenClick = this.listenClick.bind(this);
        this.createPlacemark = this.createPlacemark.bind(this);
        this.getAddress = this.getAddress.bind(this);
        this.showAllStores = this.showAllStores.bind(this);
        this.showStore = this.showStore.bind(this);
        this.addMyPosition = this.addMyPosition.bind(this);
    }

    init () {
        this.map = new ymaps.Map(this.mapId, { // eslint-disable-line
            center: this.coord,
            zoom: this.zoom,
            controls: ['zoomControl']
        }, {
            searchControlProvider: 'yandex#search'
        });
    }

    createPlacemark (coords) {
        return new ymaps.Placemark(coords, {    // eslint-disable-line
            iconCaption: 'поиск...'
        }, {
            preset: 'islands#violetDotIconWithCaption',
            draggable: true
        });
    }

    listenClick () {
        this.map.events.add('click', (e) => {
            var coords = e.get('coords');
            if (this.myPlacemark) {
                this.myPlacemark.geometry.setCoordinates(coords);
                this.getAddress(this.myPlacemark.geometry.getCoordinates());
                localStorage.setItem('newRestarauntCoordinate', coords);
            } else {
                this.myPlacemark = this.createPlacemark(coords);
                this.map.geoObjects.add(this.myPlacemark);
                this.myPlacemark.events.add('dragend', () => {
                    localStorage.setItem('newRestarauntCoordinate', coords);
                    this.getAddress(this.myPlacemark.geometry.getCoordinates());
                });
            }
        });
    }

    getAddress (coords) {
        this.myPlacemark.properties.set('iconCaption');
        ymaps.geocode(coords).then((res) => { // eslint-disable-line
            var firstGeoObject = res.geoObjects.get(0);
            this.myPlacemark.properties
                .set({
                    iconCaption: [
                        firstGeoObject.getLocalities().length ? firstGeoObject.getLocalities() : firstGeoObject.getAdministrativeAreas(),
                        firstGeoObject.getThoroughfare() || firstGeoObject.getPremise()
                    ].filter(Boolean).join(', '),
                    balloonContent: firstGeoObject.getAddressLine()
                });
        });
    }

    showStore (store) {
        var myPlacemark = new ymaps.Placemark(  // eslint-disable-line
            [store.latitude, store.longitude],
            { hintContent: store.hintContent });
        var storeRadius = new ymaps.Circle([    // eslint-disable-line
            [store.latitude, store.longitude],
            store.distance
        ], {
            balloonContent: 'Зона доставки ' + store.hintContent
        }, {
            fillColor: '#DB709344',
            strokeOpacity: 0.4
        });
        this.map.geoObjects.add(myPlacemark);
        this.map.geoObjects.add(storeRadius);
    }

    addMyPosition () {
        const success = position => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            var me = new ymaps.Placemark([latitude, longitude], // eslint-disable-line
                { hintContent: 'Это Вы!' },
                {
                    iconLayout: 'default#image',
                    iconImageHref: '../assets/img/man2.png',
                    iconImageSize: [30, 30],
                    iconImageOffset: [-15, -15]
                });
            this.map.geoObjects.add(me);
            var meRadius = new ymaps.Circle([ // eslint-disable-line
                [latitude, longitude], 5000
            ], {
                balloonContent: 'Ваш район'
            }, {
                fillColor: '#BFE7DC55',
                strokeOpacity: 0.4
            });
            this.map.geoObjects.add(meRadius);
        };
        navigator.geolocation.getCurrentPosition(success);
    }

    showAllStores (placemarks) {
        placemarks.forEach(store => {
            var myPlacemark = new ymaps.Placemark( // eslint-disable-line
                [store.latitude, store.longitude],
                { hintContent: store.hintContent });
            var storeRadius = new ymaps.Circle([ // eslint-disable-line
                [store.latitude, store.longitude],
                store.distance
            ], {
                balloonContent: 'Зона доставки ' + store.hintContent
            }, {
                fillColor: '#DB709333',
                strokeOpacity: 0.1
            });
            this.map.geoObjects.add(myPlacemark);
            this.map.geoObjects.add(storeRadius);
        });
    }
}
