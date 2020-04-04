import Button from 'ol-ext/control/Button';
import Select from 'ol/interaction/Select';

export default class GeolocationControl {
    constructor(handleSuccess, handleErr) {

        this._button = new Button({
            html: '📌', //<i class="fa fa-hand-pointer-o"></i>
            className: "select",
            title: "Locate me",
            interaction: new Select(),
            handleClick: function () {

                if ('geolocation' in navigator) {
                    const geo = navigator.geolocation;
                    geo.getCurrentPosition(handleSuccess, handleErr);

                } else {
                    console.log("geolocation IS NOT available");
                }
            }
        });
    }

    get button() {
        return this._button;
    }



}