import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import { Fill, Stroke, Circle, Style, Icon } from 'ol/style';

const markerStyle = (color) => {

  if(!color){
    color = '#E8100C';
  }
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

export const addMarker = (source,coordinate,color) => {
  const feature = new Feature({
    geometry: new Point(coordinate),
    type: 'removable',
  });

  feature.setStyle(markerStyle(color));
  source.addFeature(feature);
}


export const setMarkerOnEvent = (map, event) => {
  console.log("setMarkerOnEvent");
  map.on(event, ev => {
    if (markerLayer.getVisible()) {
      markerSource.clear();
      addMarker(markerSource, ev);
    }
  });
}
