var library;

$.ajax({
  url: "../backend/get-admin.php",
  type: "POST",
  dataType: "json",
  data: {
      type: 4
  },
  cache: false,
  success: function (response) {
    load(response);
  }
});



function load(json) {

  var baseLayer = L.tileLayer(
    'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 10
  }
  );

  var cfg = {
    "radius": 50,
    "maxOpacity": .7,
    "scaleRadius": false,
    "useLocalExtrema": false,
    latField: 'lat',
    lngField: 'lng',
    valueField: 'count'
  };


  var heatmapLayer = new HeatmapOverlay(cfg);

  var map = new L.Map('mapid', {
    center: new L.LatLng(38.2, 21.7),
    zoom: 1.75,
    layers: [baseLayer, heatmapLayer]
  });

  var userIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  var serverIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-violet.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  
  let x = json.length;
 
  json.forEach(json => {
    var marker = L.marker([json.slat, json.slon], {icon: serverIcon}).addTo(map);
    marker.bindPopup("IP: "+json.server+"<br> Lat: "+json.slat+"<br> Long: "+json.slon+"");
    var marker = L.marker([json.ulat, json.ulon], {icon: userIcon}).addTo(map);
    marker.bindPopup("IP: "+json.user+"<br> Lat: "+json.ulat+"<br> Long: "+json.ulon+"");
    var latlngs = [[json.slat, json.slon],[json.ulat, json.ulon]]; 
    var w = Math.max(json.count/x, 0.5);
    var polyline = L.polyline(latlngs, {color: 'red', weight: w, opacity: 0.4}).addTo(map);
    polyline.bindPopup("User IP: "+json.user+"<br> Server IP: "+json.server+"<br> Connections: "+json.count+"");
  });

}

function myFunction() {
  var x = document.getElementById("tog");
  if (x.style.display === "none") {
    x.style.display = "block";
    $("#mapid").hide();
    $("#togbtn").html("Show map");
  } else {
    x.style.display = "none";
    $("#mapid").show();
    $("#togbtn").html("Show Table");
  }
}
