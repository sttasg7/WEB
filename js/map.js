
$.ajax({
  url: "../backend/getmapdata.php",
  type: "POST",  
  dataType: "json",
  cache: false,  
  success: function(res){
    console.log(res);      
  }
}).then(
  $.ajax({
    url: "../backend/getServerInfo.php",
    type: "POST",  
    dataType: "json",
    cache: false,    
    success: function(res){
      console.log(res);      
    }
  })
);


var testData = {
  max: 8,
  data: [{lat: 0, lng:46.7728, count: 5},
         {lat: 0, lng:46.7728, count: 6}]
};

var baseLayer = L.tileLayer(
  'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
    attribution: '...',
    maxZoom: 18
  }
);

var cfg = {"radius": 2,
  "maxOpacity": .8,
  "scaleRadius": true,
  "useLocalExtrema": true,
  latField: 'lat',
  lngField: 'lng',
  valueField: 'count'
};


var heatmapLayer = new HeatmapOverlay(cfg);

var map = new L.Map('mapid', {
  center: new L.LatLng(38.2, 21.7),
  zoom: 3,
  layers: [baseLayer, heatmapLayer]
});

heatmapLayer.setData(testData);