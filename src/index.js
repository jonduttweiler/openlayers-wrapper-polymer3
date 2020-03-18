import { PolymerElement, html } from '@polymer/polymer';

import { Map, View } from 'ol';
import { fromLonLat } from 'ol/proj';
//Layers
import raster from './layers/raster';


class OpenlayersMap extends PolymerElement {

    static get template() {
        return html`
         <link rel="stylesheet" href="ol.css">
         <style>
             #map{
                 height:100%
             }
         </style>
        
        <div id="map"></div>
        `;
    }

    constructor() {
        super();
    }

    initComponent(longitude = -60.712829, latitude = -31.641445, zoom = 14) {
        try {
            const target = this.$.map;
            const map = new Map({
                target: target,
                layers: [raster],
                view: new View({
                    center: fromLonLat([longitude, latitude]),
                    zoom: zoom
                }),
  
            });

        } catch (err) {
            console.log(err);
        }

    }

     connectedCallback() {
        super.connectedCallback();
        this.initComponent();
    } 


}

customElements.define("openlayers-map", OpenlayersMap);
