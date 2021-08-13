var library;

//kanoume AJAX kai molis teleiwsei kanei thn load
$.ajax({
  url: "../backend/get-admin.php",
  type: "POST",
  dataType: "json", //an deis se alla AJAX, kanw sto success ena JSON.parse gia na parw ta data. einai to idio me to na oriseis to dataType ex arxhs sthn klhsh.
  data: {
    type: 4
  },
  cache: false,
  success: function (response) {
    load(response);
  }
});


//ki edw isws to json na empaine san global
function load(json) {

  var baseLayer = L.tileLayer(
    'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 10
  }
  );

  var map = new L.Map('mapid', {
    center: new L.LatLng(38.2, 21.7),
    zoom: 1.75,
    layers: [baseLayer]
  });

  //na 8ymh8w na to valw ki auto sto About me ta tools
  var userIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
    shadowUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  var serverIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-violet.png',
    shadowUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  //to max to xrhsimopoiw, to sum efage poulo nomizw. alla as' ta kai vlepoume
  let max = 0;
  let sum = 0;
  let x = json.length;
  json.forEach(json => {
    if (parseInt(json.count) > max) {
      max = parseInt(json.count);
    }
    sum += parseInt(json.count);
  });


  json.forEach(json => {
    var marker = L.marker([json.slat, json.slon], { icon: serverIcon }).addTo(map);
    marker.bindPopup("IP: " + json.server + "<br>Latitude: " + json.slat + "<br>Longitude: " + json.slon + "");
    var marker = L.marker([json.ulat, json.ulon], { icon: userIcon }).addTo(map);
    marker.bindPopup("IP: " + json.user + "<br>Latitude: " + json.ulat + "<br>Longitude: " + json.ulon + "");
    var latlngs = [[json.slat, json.slon], [json.ulat, json.ulon]];
    var w = Math.max(x * parseInt(json.count) / max, 2);
    w = Math.min(w, 10);
    var polyline = L.polyline(latlngs, { color: 'red', weight: w, opacity: 0.4 }).addTo(map);
    polyline.bindPopup("User IP: " + json.user + "<br>Server IP: " + json.server + "<br>Connections: " + json.count + "");
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
