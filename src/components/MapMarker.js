import { PolymerElement, html } from '@polymer/polymer';

class MapMarker extends PolymerElement {

    static get template() {
        return html`<p>I'm a marker 
                        <strong>latitude:</strong>[[mLatitude]]
                        <strong>longitude:</strong>[[mLongitude]] 
                    <p>`;
    }

    static get properties() {
        return {
            mLatitude: { 
                type: Number,
            },
            mLongitude: { 
                type: Number,
            },
            mColor: { 
                type: String,
            }
        }
    }


}
customElements.define('map-marker', MapMarker);

export default MapMarker;