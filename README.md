
# openlayers-wrapper-polymer3

Custom Element created with Polymer3 for maps

#### Usage
~~~~
<openlayers-map></openlayers-map>
~~~~

~~~~
<openlayers-map
   view-lon="-60.712829"
   view-lat="-31.641445"
   view-zoom="14"
   raster-source="http://a.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
>
</openlayers-map>
~~~~

#### Size
Place the custom element in a div with the desired dimensions
~~~~
<div class="map-container" style="width:100%;height: 300px;">
	<openlayers-map></openlayers-map>
</div>
~~~~


#### Updating view dynamically
You can modify the view changing element attribute values
~~~~
const map = document.querySelector("#map1");
map.setAttribute("view-lon","-60.62");
map.setAttribute("view-lat","-31.62");
map.setAttribute("view-zoom","11");
~~~~


#### Add markers dinamically 
~~~~
const map = document.querySelector("#map1");
map.appendChild(new MapMarker({longitude:-60.698051,latitude: -31.614810, color:"#FFDC45"}));
map.appendChild(new MapMarker({longitude:-60.721049,latitude: -31.654999, color:"#46E8D4"})); 
map.appendChild(new MapMarker({longitude:-60.711903,latitude: -31.662787, color:"#0090FE"}));
~~~~