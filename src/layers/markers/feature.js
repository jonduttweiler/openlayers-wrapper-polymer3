import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import { Fill, Stroke, Circle, Style, Icon } from 'ol/style';

export const createMarkerFeature = (coordinate,color) => {
  const feature = new Feature({
    geometry: new Point(coordinate),
    type: 'removable',
  });

  feature.setStyle(markerStyle(color));
  return feature;
}

const markerStyle = (color = '#E8100C') => {
  return new Style({
  
    image: new Circle({
      radius: 6,
      fill: new Fill({
        color: color
      }),
      stroke: new Stroke({
        color: "black", 
        width: 1
      })
    })
  });
}