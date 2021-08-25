var library;

//use ajax to get data from server, then use load()
$.ajax({
  url: "../backend/getmapdata.php",
  type: "POST",
  dataType: "json",
  cache: false,
  success: function (response) {
    load(response);
  }
});

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


function load(json) {

  if (json) {
    var len = json.length;
    var txt = "";

    //create table
    if (len > 0) {
      for (var i = 0; i < len; i++) {
        if (json[i].lat) {
          txt += "<tr><td>" + json[i].ip + "</td><td>" + json[i].count + "</td><td>" + json[i].lat + "</td><td>" + json[i].lng + "</td></tr>";
        }
      }
      if (txt != "") {
        $("#table").append(txt);
      }
    }
  }

  var myData = {
    data: json
  };

  heatmapLayer.setData(myData);
}


//toggle for map/table
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