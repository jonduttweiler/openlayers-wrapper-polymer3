import {OpenlayersMap, MapMarker} from './main';

//hacer algo con el mapa
const map = document.querySelector("#map1");

map.setAttribute("view-lon","-60.62");
map.setAttribute("view-lat","-31.62");
map.setAttribute("view-zoom","11");


map.appendChild(new MapMarker({longitude:-60.698051,latitude: -31.614810, color:"#FFDC45"}));
map.appendChild(new MapMarker({longitude:-60.721049,latitude: -31.654999, color:"#46E8D4"})); 
map.appendChild(new MapMarker({longitude:-60.711903,latitude: -31.662787, color:"#0090FE"}));
