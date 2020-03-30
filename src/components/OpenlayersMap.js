import { PolymerElement, html } from '@polymer/polymer';

import Map from 'ol/Map';
import View from 'ol/View';
import { fromLonLat } from 'ol/proj';

import TileXYZ from '../layers/TileXYZ';
import Markers from '../layers/markers/Markers';

import '../styles/openlayers';

class OpenlayersMap extends PolymerElement {

    static get template() {
        return html`
        <style include="openlayers-style"></style>
        <style>
            :host{
                display:block;
            }

            #map{
                 width:100%;
                 height:100%;
                 box-sizing: border-box;
             }
         </style>
        
        <div id="map"></div>
        <slot id="marker" name="marker" style="display:none"><slot>
        `;
    }

    static get properties() {
        return {
            tileSource:{
                type:String,
                value:"http://a.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
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
        this.initMap();
        this.processChildElements();
    }

    initLayers(){
        this.layers = {};

        const base = new TileXYZ(this.tileSource);
        this.layers["base"] = base.layer;

        this.markers = new Markers({multi:true});
        this.layers["marker"] = this.markers.layer;
    }


    initMap() {
        const map = new Map({
            target: this.$.map,
            layers: Object.values(this.layers),
            view: this.createView()
        });
        this.map = map;
    }

    createView() {
        const longitude = this.viewLon;
        const latitude = this.viewLat;
        const zoom = this.viewZoom;
        return new View({
            center: fromLonLat([longitude, latitude]),
            zoom: zoom
        });
    }

    processChildElements(){
        this.processChildMarkers();
        
    }

    processChildMarkers(){
        const markerSlot = this.$.marker;
        const assigned = markerSlot.assignedElements();
        assigned.forEach(el => {
            const latitude = el.getAttribute("m-latitude");
            const longitude = el.getAttribute("m-longitude");
            const color = el.getAttribute("m-color");
            const coords = fromLonLat([longitude,latitude]);
            console.log("add marker at"+coords);
            this.markers.addMarker(coords, color);
        });
    }

    connectedCallback() {
        super.connectedCallback();
        this.initComponent();
    }


}

customElements.define("openlayers-map", OpenlayersMap);
export default OpenlayersMap;
