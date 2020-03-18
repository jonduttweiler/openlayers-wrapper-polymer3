import { PolymerElement, html } from '@polymer/polymer';

import { Map, View } from 'ol';
import { fromLonLat } from 'ol/proj';

import createRaster from './layers/raster';

import './styles/openlayers';

class OpenlayersMap extends PolymerElement {

    static get template() {
        return html`
        <style include="openlayers-style"> </style>
        <style>
             #map{
                 width:100%;
                 height:100%
             }
         </style>
        
        <div id="map"></div>
        `;
    }

    static get properties() {
        return {
            rasterSource:{
                type:String,
               /*  default:"http://a.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png" */
            },
            viewLon:{
                type: Number
            },
            viewLat:{
                type: Number
            },
            viewZoom:{
                type: Number
            },
        }
    }

    constructor() {
        super();
    }

    initComponent() {
        //longitude = -60.712829, latitude = -31.641445, zoom = 14
        const longitude = this.viewLon || -60.712829;
        const latitude = this.viewLat || -31.641445;
        const zoom = this.viewZoom || 14;

        const raster = createRaster(this.rasterSource);


        const target = this.$.map;
        const map = new Map({
            target: target,
            layers: [raster],
            view: new View({
                center: fromLonLat([longitude, latitude]),
                zoom: zoom
            }),
        });
    }

    connectedCallback() {
        super.connectedCallback();
        this.initComponent();
    }


}

customElements.define("openlayers-map", OpenlayersMap);
