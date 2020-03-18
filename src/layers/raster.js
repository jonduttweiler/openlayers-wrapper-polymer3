import TileLayer from 'ol/layer/Tile';
import XYZSource from 'ol/source/XYZ';

export default new TileLayer({
  title: "raster",
  baseLayer: true,
  source: new XYZSource({
    url: 'http://a.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png '
  })
});


