export class MapAPI {
    constructor (params) {
        this.coords = [55.75, 37.62];
        this.zoom = params.zoom;
        this.mapId = params.div;

        ymaps.ready(this.init.bind(this));
    }

    init () {
        this.myMap = new ymaps.Map(this.mapId, {
            center: this.coords,
            zoom: this.zoom,
            controls: ['zoomControl']
        });
    }

    createPlacemark (coords) {
        return new ymaps.Placemark(coords);
    }
}
