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
                reflectToAttribute: true

            },
            mLongitude: {
                type: Number,
                reflectToAttribute: true

            },
            mColor: {
                type: String,
                reflectToAttribute: true
            }
        }
    }
    constructor(props) {
        super();
        if (props) {
            if (props.longitude) this.mLongitude = props.longitude;
            if (props.latitude) this.mLatitude = props.latitude;
            if (props.color) this.mColor = props.color;

        }

        this.setAttribute("slot","marker");
    }


}
customElements.define('map-marker', MapMarker);

export default MapMarker;