export class MapAPI {
    constructor (params) {
        this.coords = [55.75, 37.62];
        this.zoom = params.zoom;
        this.mapId = params.div;
        this.myPlacemark = null;
        this.map = null;

        ymaps.ready(this.init.bind(this)); // eslint-disable-line
        this.init = this.init.bind(this);
        this.listenClick = this.listenClick.bind(this);
        this.createPlacemark = this.createPlacemark.bind(this);
        this.getAddress = this.getAddress.bind(this);
        this.showAllStores = this.showAllStores.bind(this);
    }

    init () {
        this.map = new ymaps.Map(this.mapId, { // eslint-disable-line
            center: this.coords,
            zoom: this.zoom,
            controls: ['zoomControl']
        });
    }

    createPlacemark (coords) {
        return new ymaps.Placemark(coords); // eslint-disable-line
    }

    listenClick = () => {
        this.map.events.add('click', (e) => {
            var coords = e.get('coords');
            // Если метка уже создана – просто передвигаем ее.
            if (this.myPlacemark) {
                this.myPlacemark.geometry.setCoordinates(coords);
            } else {
                this.myPlacemark = this.createPlacemark(coords);
                this.map.geoObjects.add(this.myPlacemark);
                // Слушаем событие окончания перетаскивания на метке.
                this.myPlacemark.events.add('dragend', function () {
                    this.getAddress(this.myPlacemark.geometry.getCoordinates());
                });
            }
            console.log(this.getAddress(coords));
        });
    }

    getAddress (coords) {
        this.myPlacemark.properties.set('iconCaption');
        ymaps.geocode(coords).then(function (res) { // eslint-disable-line
            var firstGeoObject = res.geoObjects.get(0);

            this.myPlacemark.properties
                .set({
                    // Формируем строку с данными об объекте.
                    iconCaption: [
                        // Название населенного пункта или вышестоящее административно-территориальное образование.
                        firstGeoObject.getLocalities().length ? firstGeoObject.getLocalities() : firstGeoObject.getAdministrativeAreas(),
                        // Получаем путь до топонима, если метод вернул null, запрашиваем наименование здания.
                        firstGeoObject.getThoroughfare() || firstGeoObject.getPremise()
                    ].filter(Boolean).join(', '),
                    // В качестве контента балуна задаем строку с адресом объекта.
                    balloonContent: firstGeoObject.getAddressLine()
                });
        });
    }

    showAllStores = () => {
        var placemarks = [
            {
                latitude: 55.7894,
                longitude: 37.7925,
                hintContent: '%ресторан_нейм%',
                distance: 5000,
                id: 1488
            },
            {
                latitude: 55.7678,
                longitude: 37.6860,
                hintContent: '%ресторан_нейм%',
                distance: 3000
            },
            {
                latitude: 55.7657,
                longitude: 37.5942,
                hintContent: '%ресторан_нейм%',
                distance: 5000
            },
            {
                latitude: 55.7207,
                longitude: 37.7329,
                hintContent: '%ресторан_нейм%',
                distance: 2000
            }
        ];

        placemarks.forEach(store => {
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
        });
    }
}
