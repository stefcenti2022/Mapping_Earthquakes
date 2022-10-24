// Add console.log to check to see if our code is working.
console.log('working');

// Create vars to switch between map types
let streetMap = 'streets-v11';
let darkMap = 'dark-v10';

let streetMarker = function (pop) {
  return {
    color: 'blue',
    lineweight: 4,
    radius: pop / 100000,
  };
};

let darkMarker = function (pop) {
  return {
    color: 'orange',
    lineweight: 4,
    radius: pop / 200000,
  };
};

//var mapType = darkMap;
var mapType = streetMap;
var markerType = mapType === streetMap ? streetMarker : darkMarker;

var mapUrl =
  'https://api.mapbox.com/styles/v1/mapbox/' +
  mapType +
  '/tiles/{z}/{x}/{y}?access_token={accessToken}';

// Create the map object with a center and zoom level.
let map = L.map('mapid').setView([40.7128, -95.3698], 4);

// Get data from cities.js
let cityData = cities;

// Loop through the cities array and create one marker for each city.
cityData.forEach(function (city) {
  console.log(city);
  L.circleMarker(city.location, markerType(city.population))
    .addTo(map)
    .bindPopup(
      '<h2>' +
        city.city +
        ', ' +
        city.state +
        '</h2> <hr> <h3>Population ' +
        city.population.toLocaleString() +
        '</h3>'
    )
    .addTo(map);
});

// We create the tile layer that will be the background of our map.
let streets = L.tileLayer(mapUrl, {
  attribution:
    'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
  maxZoom: 18,
  accessToken: API_KEY,
});

// Then we add our 'graymap' tile layer to the map.
streets.addTo(map);
