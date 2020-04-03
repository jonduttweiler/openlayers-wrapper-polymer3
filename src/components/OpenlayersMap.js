import { PolymerElement, html } from '@polymer/polymer';

import Map from 'ol/Map';
import View from 'ol/View';
import { fromLonLat, toLonLat } from 'ol/proj';

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
                type: Number,
                value:0,
                notify: true,
            },
            viewLat:{
                type: Number,
                value: 0,
                notify: true,
            },
            viewZoom:{ //two way data-binding
                type: Number,
                value: 1,
                notify:true,
            },
        }
    }

    constructor() {
        super();
    }

    connectedCallback() {
        super.connectedCallback();
        this.initComponent();
        
    }

    initComponent() {
        this.initLayers();
        this.initMap();
        this.processChildElements();
        this.addChangeViewListeners();
        this.addMutationListener();
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

        const view = new View({
            enableRotation:false,
            center: fromLonLat([longitude, latitude]),
            zoom: zoom
        });
        this.view = view;
        return view;
    }

    processChildElements(){
        this.processChildMarkers();
        
    }

    processChildMarkers(){
        const markerSlot = this.$.marker;
        const assigned = markerSlot.assignedElements();
        assigned.forEach(el => this.addMarkerFromElement(el)); 
    }


    addMarkerFromElement(element){
        const latitude = element.getAttribute("m-latitude");
        const longitude = element.getAttribute("m-longitude");
        const color = element.getAttribute("m-color");
        const coords = fromLonLat([longitude,latitude]);
        this.markers.addMarker(coords, color);
    }



    addChangeViewListeners(){
        this.addEventListener('view-lon-changed', e => {
            const newLongitude = e.detail.value;
            const prevCoordinates = this.view.getCenter();
            const prevLat = toLonLat(prevCoordinates)[1];
            const updatedCoordinates = fromLonLat([ newLongitude, prevLat]);

            const deltaCoordinates = [updatedCoordinates[0] - prevCoordinates[0], 0];
            this.view.adjustCenter(deltaCoordinates);
            return this;
        });

        this.addEventListener('view-lat-changed', e => {
            const newLatitude = e.detail.value;
            const prevCoordinates = this.view.getCenter();
            const prevLon = toLonLat(prevCoordinates)[0];
            const updatedCoordinates = fromLonLat([ prevLon, newLatitude]);

            const deltaCoordinates = [0,updatedCoordinates[1] - prevCoordinates[1]];
            this.view.adjustCenter(deltaCoordinates);
            return this;
        });

        this.addEventListener('view-zoom-changed', e => {
            const newValue = e.detail.value;
            const prevValue = this.view.getZoom();
            const delta = newValue - prevValue;

            this.view.adjustZoom(delta);
            return this;
        });
    }

    addMutationListener(){
        
        const callback = (mutationsList, observer) => {
            for(let mutation of mutationsList) {
                if (mutation.type === 'childList') { 
                    mutation.addedNodes.forEach(el => this.addMarkerFromElement(el));
                }
                //TODO: implement remove
            }
        };

        const observer = new MutationObserver(callback);
        const config = { attributes: false, childList: true, subtree: false};
        observer.observe(this, config);
    }




}

customElements.define("openlayers-map", OpenlayersMap);
export default OpenlayersMap;
