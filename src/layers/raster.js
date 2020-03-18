import TileLayer from 'ol/layer/Tile';
import XYZSource from 'ol/source/XYZ';

const createRasterLayer = function (XYZurl) {
  return new TileLayer({
    title: "raster",
    baseLayer: true,
    source: new XYZSource({
      url: XYZurl
    })
  });

}


export default createRasterLayer;


