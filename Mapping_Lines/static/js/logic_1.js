// Add console.log to check to see if our code is working.
console.log('working');

// Create vars to switch between map types
let streetMap = 'streets-v11';
let satelliteMap = 'satellite-streets-v11';
let darkMap = 'dark-v10';
let lightMap = 'light-v10';

let streetLine = {
  color: 'red',
};

let darkLine = {
  color: 'orange',
};

let satelliteLine = {
  color: 'yellow',
};

let lightLine = {
  color: 'blue',
  weight: 2,
  opacity: 0.5,
  dashArray: '6,4',
};

//var mapType = darkMap;
var mapType = lightMap;

var lineType =
  mapType === streetMap
    ? streetLine
    : mapType === darkMap
    ? darkLine
    : mapType === satelliteMap
    ? satelliteLine
    : lightLine;

console.log(lineType);

var mapUrl =
  'https://api.mapbox.com/styles/v1/mapbox/' +
  mapType +
  '/tiles/{z}/{x}/{y}?access_token={accessToken}';

// Create the map object with a center and zoom level.
let STL = [38.741, -90.3645];
let map = L.map('mapid').setView(STL, 5);

// Coordinates for each point to be used in the polyline.
let SFO = [37.6213, -122.379];
let JFK = [40.641766, -73.780968];
let AUS = [30.266666, -97.73333];
let YYZ = [37.22, 54.38];
let TUC = [32.25346, -110.911789];

let line = [SFO, TUC, AUS, YYZ, JFK];

// Create polyline using the line coordinates and make the line red.
L.polyline(line, lineType).addTo(map);

// We create the tile layer that will be the background of our map.
let streets = L.tileLayer(mapUrl, {
  attribution:
    'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
  maxZoom: 18,
  accessToken: API_KEY,
});

// Then we add our 'graymap' tile layer to the map.
streets.addTo(map);
