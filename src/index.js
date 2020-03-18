import { PolymerElement, html } from '@polymer/polymer';

class OpenlayersMap extends PolymerElement{

    static get template(){
        return html`<div>I'm a map</div>`;
    }
    
}

customElements.define("openlayers-map",OpenlayersMap);