import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { createMarkerFeature } from './feature';


export default class Markers {

    constructor(options = {}) {
        const { multi = false } = options;

        this.multi = multi;
        this._source = new VectorSource();
        this._layer = new VectorLayer({ title: "marker", source: this._source });

        this.current = -1; 
    }

    get source() { return this._source };
    get layer() { return this._layer };

    addMarker(coordinates, color) {
        if(!this.multi) this.clearMarkers();        
        
        const feature = createMarkerFeature(coordinates,color); //y si le damos un uuid__?
        this._source.addFeature(feature);
    }

    next() {
        //TODO: REFACT: the following line is based on that ol_uid is a number
        const features = this._source.getFeatures().sort((fa,fb) => parseInt(fa.ol_uid) > parseInt(fb.ol_uid));
        if (this.current < features.length) {
            this.current = (this.current + 1) % features.length;
            return features[this.current];
        }
    }

    clearMarkers(fast = true) {
        this._source.clear(fast);
        this.current = -1;
    }













}