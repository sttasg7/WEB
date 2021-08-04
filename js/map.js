var library;

$.ajax({
    url: "../backend/getmapdata.php",
    type: "POST", 
    dataType: "json",   
    cache: false,
    success: function(response){
      load(response);
      }     
  });



function load(json) {

var myData = {
  data: json
};

var baseLayer = L.tileLayer(
  'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
    attribution: '...',
    maxZoom: 18
  }
);

var cfg = {"radius": 5,
  "maxOpacity": .7,
  "scaleRadius": true,
  "useLocalExtrema": true,
  latField: 'lat',
  lngField: 'lng',
  valueField: 'count'
};


var heatmapLayer = new HeatmapOverlay(cfg);

var map = new L.Map('mapid', {
  center: new L.LatLng(38.2, 21.7),
  zoom: 1.3,
  layers: [baseLayer, heatmapLayer]
});

heatmapLayer.setData(myData);

}