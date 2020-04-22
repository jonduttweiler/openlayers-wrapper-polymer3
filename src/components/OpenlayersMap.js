import { PolymerElement, html } from '@polymer/polymer';

import Map from 'ol/Map';
import View from 'ol/View';
import { fromLonLat, toLonLat } from 'ol/proj';

import TileXYZ from '../layers/TileXYZ';
import Markers from '../layers/markers/Markers';

import Bar from 'ol-ext/control/Bar';
import GeolocationControl from '../controls/geolocation';

import { defaults as defaultInteractions, DragPan, MouseWheelZoom } from 'ol/interaction';
import { mouseOnly , platformModifierKeyOnly} from 'ol/events/condition';


import '../styles/openlayers';
import '../styles/ol-ext';

class OpenlayersMap extends PolymerElement {

    static get template() {
        return html`
            <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap" rel="stylesheet">
            <style include="openlayers-style"></style>
            <style include="olext-style"></style>

            <style>
                :host{
                    display:block;
                    width:100%;
                    height: 100%;
                    box-sizing:border-box;
                }

                #map-container{
                    width:100%;
                    height:100%;
                    box-sizing: border-box;
                    position: relative;

                }
                #map{
                    width:100%;
                    height:100%;
                    box-sizing: border-box;
                }

                #backdrop{
                    width: 100%;
                    height: 100%;
                    position: absolute;
                    top:0;
                    left:0;
                    box-sizing: border-box;

                    display: none; /*switch with flex*/
                    justify-content: center;
                    align-items: center;
                    padding:20%;
                    text-align:justify;

                    font-size: 1.5rem;
                    background-color: rgb(0,0,0,0.3);
                    color:white;
                    z-index:500;
                    user-select: none;

                }

            </style>
            <div id="map-container">
                <div id="map"></div>
                <div id="backdrop"></div>
                <slot id="marker" name="marker" style="display:none"><slot>
            </div>
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
            locateMeControl:{
                type: Boolean, 
                value: false
            }
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

        this.addControls();
        this.initBackdrop();
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
            view: this.createView(),
            interactions: this.createInteractions()
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
    
    _createMobileInteraction(){
        const self = this;

        const dragPan = new DragPan({
            condition: function (event) {
                if(mouseOnly(event)){
                    return true;
                } else { //touch interactions
                    return this.getPointerCount() === 2;  
                }
            }
        });

        const mouseWheelZoom = new MouseWheelZoom({
            condition: event => {
                if (event.type === "wheel") {
                    if (platformModifierKeyOnly(event)) {
                        return true;
                    } else {
                        self.blinkMessage("Use ctrl + scroll to zoom the map");
                        return false;
                    }
                }

                return platformModifierKeyOnly(event);
            }
        });

        return [dragPan, mouseWheelZoom];
    }

    createInteractions(){
        return defaultInteractions({dragPan: false, mouseWheelZoom: false}).extend(this._createMobileInteraction());
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
            this.view.adjustCenter(deltaCoordinates); //TODO: replace with setCenter
            return this;
        });

        this.addEventListener('view-lat-changed', e => {
            const newLatitude = e.detail.value;
            const prevCoordinates = this.view.getCenter();
            const prevLon = toLonLat(prevCoordinates)[0];
            const updatedCoordinates = fromLonLat([ prevLon, newLatitude]);

            const deltaCoordinates = [0,updatedCoordinates[1] - prevCoordinates[1]];
            this.view.adjustCenter(deltaCoordinates); //TODO: replace with setCenter
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


    addControls(){
        if(this.locateMeControl)  this.addLocateMeControl();

    }

    addLocateMeControl(){
        const mainbar = new Bar();
        mainbar.setPosition("top-left")
        this.map.addControl(mainbar);

        const handleSuccess = position => { this.showPositionOnMap(position); }
        const handleErr = err => console.log(err);

        const locateBtn = new GeolocationControl(handleSuccess,handleErr).button;

        mainbar.addControl(locateBtn);
    }

    showPositionOnMap(position){
        const { latitude, longitude } = position.coords;
        const coordinates = fromLonLat([longitude,latitude]);
        this.view.animate({center: coordinates,duration: 500,zoom:15});
        this.markers.addMarker(coordinates);
    }


    initBackdrop(){
        const backdrop = this.shadowRoot.querySelector("#backdrop");
        backdrop.addEventListener("wheel", ev => ev.ctrlKey && ev.preventDefault());
        //Ver como ignorar el pich zoom sobre esto en touch
    }

    showMessage(msg){
        const backdrop = this.shadowRoot.querySelector("#backdrop");
        backdrop.innerText = msg;
        backdrop.style.display = "flex";
    }

    hideMessage(){
        const backdrop = this.shadowRoot.querySelector("#backdrop");
        backdrop.style.display = "none";
        backdrop.innerText ="";
    }

    blinkMessage(msg, duration = 1000){
        this.showMessage(msg);
        return setTimeout( _ => this.hideMessage(),duration);
    }



}

customElements.define("openlayers-map", OpenlayersMap);
export default OpenlayersMap;
