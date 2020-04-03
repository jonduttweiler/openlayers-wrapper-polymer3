
# openlayers-wrapper-polymer3

Custom Element created with Polymer3 for maps

Usage:
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


Important: place the custom element in a div with the desired dimensions
  ~~~~
<div class="map-container" style="width:100%;height: 300px;">
	<openlayers-map></openlayers-map>
</div>
  ~~~~
