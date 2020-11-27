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
    }

    init () {
        this.map = new ymaps.Map(this.mapId, { // eslint-disable-line
            center: this.coords,
            zoom: this.zoom,
            controls: ['zoomControl']
        });
        this.listenClick();
    }

    createPlacemark (coords) {
        return new ymaps.Placemark(coords); // eslint-disable-line
    }

    listenClick () {
        this.map.events.add('click', function (e) {
            var coords = e.get('coords');
            console.log('asdsadsadsa', this.myPlacemark);
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
            this.getAddress(coords);
        });
    }

    getAddress (coords) {
        this.myPlacemark.properties.set('iconCaption', 'поиск...');
        ymaps.geocode(coords).then(function (res) {
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
}
