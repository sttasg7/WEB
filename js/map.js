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

  if(json){
    var len = json.length;
    var txt = "";
    if(len > 0){
        for(var i=0;i<len;i++){
            if(json[i].lat){
                txt += "<tr><td>"+json[i].ip+"</td><td>"+json[i].count+"</td><td>"+json[i].lat+"</td><td>"+json[i].lng+"</td></tr>";
            }
        }
        if(txt != ""){
            $("#table").append(txt);
        }
    }
  }



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