import TileLayer from 'ol/layer/Tile';
import XYZSource from 'ol/source/XYZ';

export default class TileXYZ {
    constructor(XYZurl) {
        this._layer = new TileLayer({
            title: "raster",
            baseLayer: true,
            source: new XYZSource({
                url: XYZurl
            })
        });
    }

    get layer(){
        return this._layer;
    }
}