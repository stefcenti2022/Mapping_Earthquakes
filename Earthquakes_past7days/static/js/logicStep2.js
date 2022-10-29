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
  center: [40, -100],
  zoom: 3,
  layers: [streets],
});

// Pass our map layers into our layers control and add the layers control to the map.
// Expand the control to be open by default.
L.control.layers(baseMaps).addTo(map).expand();

// Accessing the airport GeoJSON URL
let earthquakes =
  'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson';

// Grabbing our GeoJSON data.
d3.json(earthquakes).then(function (data) {
  function styleInfo(feature) {
    return {
      opacity: 1,
      fillOpacity: 1,
      fillColor: '#ffae42',
      color: '#000000',
      radius: getRadius(feature.properties.mag),
      stroke: true,
      weight: 0.5,
    };
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
  }).addTo(map);
});

//   L.geoJSON(data, {
//     color: 'blue',
//   weight: 1,
//   fillColor: 'yellow',
//   // We turn each feature into a marker on the map.
//   onEachFeature: function (feature, layer) {
//     layer.bindPopup(
//       '<h4>Neighborhood: ' + feature.properties.AREA_NAME + '</h4>'
//     );
//   },
