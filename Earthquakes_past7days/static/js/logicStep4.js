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

// Create the earthquake layer for our map.
let earthquakes = new L.layerGroup();

// We define an object that contains the overlays.
// This overlay will be visible all the time.
let overlays = {
  Earthquakes: earthquakes,
};

// Create the map object with center, zoom level, and default layer.
let map = L.map('mapid', {
  center: [40, -100],
  zoom: 3,
  layers: [streets],
});

// Pass our map layers into our layers control and add the layers control to the map.
// Expand the control to be open by default.
L.control.layers(baseMaps, overlays).addTo(map);

// Accessing the earthquake GeoJSON URL
let earthquakeURL =
  'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson';

// Grabbing our GeoJSON data.
d3.json(earthquakeURL).then(function (data) {
  function styleInfo(feature) {
    return {
      opacity: 1,
      fillOpacity: 1,
      fillColor: getColor(feature.properties.mag),
      color: '#000000',
      radius: getRadius(feature.properties.mag),
      stroke: true,
      weight: 0.5,
    };
  }

  // This function determintes the color of the circle based on the magnitude
  // of the earthquake.
  function getColor(magnitude) {
    return magnitude > 5
      ? '#ea2c2c'
      : magnitude > 4
      ? '#ea822c'
      : magnitude > 3
      ? '#ee9c00'
      : magnitude > 2
      ? '#eecc00'
      : magnitude > 1
      ? '#d4ee00'
      : '#98ee00';
  }

  // This function determines the radius of the earthquake marker
  // based on its magnitude.
  // Earthquakes with a magnitude of 0 will be plotted with a radius of 1.
  function getRadius(magnitude) {
    return magnitude === 0 ? 1 : magnitude * 4;
  }

  // Creating a GeoJSON layer with the retrieved data.
  L.geoJSON(data, {
    // We turn each feature into a circleMarker on the map.
    pointToLayer: function (feature, latlng) {
      // This function returns the style data for each of the earthquakes
      // we plot on the map.  We pass the magnitude of the earthquake into
      // a function to calculate the radius.
      console.log(data);
      return L.circleMarker(latlng);
    },

    style: styleInfo,

    onEachFeature: function (feature, layer) {
      layer.bindPopup(
        '<h4>Neighborhood: ' + feature.properties.AREA_NAME + '</h4>'
      );
    },

    // We create a popup for each circleMarker to display the magnitude and
    //  location of the earthquake after the marker has been created and styled.
    onEachFeature: function (feature, layer) {
      layer.bindPopup(
        'Magnitude: ' +
          feature.properties.mag +
          '<br>Location: ' +
          feature.properties.place
      );
    },
  }).addTo(earthquakes);

  // Turn on the earthquake overlay button
  earthquakes.addTo(map);
});
