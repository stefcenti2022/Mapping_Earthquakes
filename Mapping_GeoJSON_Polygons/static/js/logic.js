// Add console.log to check to see if our code is working.
console.log('working');

// Create vars to switch between map types
let streetMap = 'streets-v11';
let satelliteMap = 'satellite-streets-v11';
let darkMap = 'dark-v10';
let lightMap = 'light-v10';
let nightMap = 'navigation-night-v1';
let outdoorMap = 'outdoors-v11';

let urlStart = 'https://api.mapbox.com/styles/v1/mapbox/';
let urlEnd = '/tiles/{z}/{x}/{y}?access_token={accessToken}';

// Create the tile layer that will be the background of our map.
let streets = L.tileLayer(urlStart + streetMap + urlEnd, {
  attribution:
    'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
  maxZoom: 18,
  accessToken: API_KEY,
});

// Create the dark view tile layer that will be an option for our map.
let satelliteStreets = L.tileLayer(urlStart + satelliteMap + urlEnd, {
  attribution:
    'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
  maxZoom: 18,
  accessToken: API_KEY,
});

// Create a bases layer that holds both maps.
let baseMaps = {
  'Streets': streets,
  'Satellite Streets': satelliteStreets,
};

// Create the map object with center, zoom level, and default layer.
let map = L.map('mapid', {
  center: [43.7, 79.3],
  zoom: 2,
  layers: [satelliteStreets],
});

// Pass our map layers into our layers control and add the layers control to the map.
// Expand the control to be open by default.
L.control.layers(baseMaps).addTo(map).expand();

// Set the default of the Control object to be set to 'Night Navigation'.
dark.addTo(map);

// Accessing the airport GeoJSON URL
let torontoData =
  'https://raw.githubusercontent.com/stefcenti2022/Mapping_Earthquakes/main/torontoRoutes.json';

// Grabbing our GeoJSON data.
d3.json(torontoData).then(function (data) {
  console.log(data);
  // Creating a GeoJSON layer with the retrieved data.
  L.geoJSON(data, {
    color: 'lightyellow',
    weight: 2,
    // We turn each feature into a marker on the map.
    onEachFeature: function (feature, layer) {
      console.log(layer);
      layer.bindPopup(
        '<h4>Airline: ' +
          feature.properties.airline +
          '<hr>' +
          'Destination: ' +
          feature.properties.dst +
          '</h4>'
      );
    },
  }).addTo(map);
});
