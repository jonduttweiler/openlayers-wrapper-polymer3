import { PolymerElement, html } from '@polymer/polymer';

import { Map, View } from 'ol';
import { fromLonLat } from 'ol/proj';

import createRaster from '../layers/raster';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';

import { addMarker } from '../layers/marker';

import '../styles/openlayers';

class OpenlayersMap extends PolymerElement {

    static get template() {
        return html`
        <style include="openlayers-style"> </style>
        <style>
            :host{
                display:block;
            }

            #map{
                 width:100%;
                 height:100%
             }
         </style>
        
        <div id="map"></div>
        <slot id="marker" name="marker" style="display:none"><slot>
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
        this.initLayers();
        this.initMarkers();
        //this.addMapEventHandlers();
    }

    initLayers(){
        const longitude = this.viewLon;
        const latitude = this.viewLat;
        const zoom = this.viewZoom;

        const raster = createRaster(this.rasterSource);


        const markerSource = new VectorSource();
        const markerLayer = new VectorLayer({
            title: "marker",
            source: markerSource
        });
        this.markerSource = markerSource; //we can use an array of layers and sources?

        const target = this.$.map;
        const map = new Map({
            target: target,
            layers: [raster,markerLayer],
            view: new View({
                center: fromLonLat([longitude, latitude]),
                zoom: zoom
            }),
        });

        this.map = map;
    }

    initMarkers(){
        const markerSlot = this.$.marker;
        const assigned = markerSlot.assignedElements();
        assigned.forEach(el => {
            const latitude = el.getAttribute("m-latitude");
            const longitude = el.getAttribute("m-longitude");
            const color = el.getAttribute("m-color");
            const coords = fromLonLat([longitude,latitude]);
            addMarker(this.markerSource,coords,color)
        });
        
    }


    addMapEventHandlers(){
        this.map.on('click', ev => {
            addMarker(this.markerSource, ev.coordinate, true);
        });

        return this;
    }





    connectedCallback() {
        super.connectedCallback();
        this.initComponent();
    }


}

customElements.define("openlayers-map", OpenlayersMap);
export default OpenlayersMap;
