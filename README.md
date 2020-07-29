# openlayers-wrapper-polymer3

Add maps into your application or page in an easy way  🌎

### Installation

#### npm 
```
npm install --save openlayers-component
```
 
#### unpkg
You can add the following in the \<head\> of your html :

```
<script src="https://unpkg.com/openlayers-component@${version}/dist/main.js"></script>
```

---
**Note:**
Remember that for the custom element to work, the script that registers it has to be loaded after the DOM is parsed. This can be done either by including the \<script> element at the bottom of the <body>, or by including the defer attribute in your \<script> element.

---


### Usage
Add the custom element tag where you want to show the map
```
<openlayers-map></openlayers-map>
```
  You can add attributes to configure the initial view and the source of your base layer
```
<openlayers-map
   view-lon="-60.712829"
   view-lat="-31.641445"
   view-zoom="14"
   tile-source="http://a.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png">
</openlayers-map>
  ```


#### Size
Place the custom element in a div with the desired dimensions
```
<div class="map-container" style="width:100%;height: 300px;">
	<openlayers-map></openlayers-map>
</div>
```


#### Updating view dynamically
You can modify the view programatically, changing element attribute values
```
const map = document.querySelector("#map1");
map.setAttribute("view-lon","-60.62");
map.setAttribute("view-lat","-31.62");
map.setAttribute("view-zoom","11");
```


#### Add markers dinamically 
```
const map = document.querySelector("#map1");
map.appendChild(new MapMarker({longitude:-60.698051,latitude: -31.614810, color:"#FFDC45"}));
map.appendChild(new MapMarker({longitude:-60.721049,latitude: -31.654999, color:"#46E8D4"})); 
map.appendChild(new MapMarker({longitude:-60.711903,latitude: -31.662787, color:"#0090FE"}));
```
