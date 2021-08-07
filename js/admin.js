var json;
var check = 0;
$.ajax({
    type: "POST",
    url: "../backend/get-admin.php",
    data: {
      type: 1
    },
    cache: false,
    success: function(response){
      json = response;
    }
  });

$(document).ready(function(){
    $("#xanax").hide();
    $("#table").hide();

    let myChart = document.getElementById('ch1').getContext('2d');
    let chart = new Chart(myChart, {
        type: 'pie',
        data: {
            labels: "",
            datasets:[{
                label: 'entries',
                data: [],
                borderWidth: 2,
                borderColor: '#111',
                backgroundColor: ""
            }]
        },
        options: {
            legend: {
                "display": true
              },
              tooltips: {
                "enabled": true
              },  
              plugins: {
                  title: {
                    display: true,
                    text: ""
                  }
              }
          }
    });
    
    var type = 0;    
    //updateChart(type, chart);
    $("#methodstable").on('click', function(){
      type = 0;
      showTable(type);
    })

    $("#statusstable").on('click', function(){
      type = 1;
      showTable(type);
    })
    
    $("#methods").on('click', function(){
        type = 0;
        updateChart(type, chart);
    });

    $("#status").on('click', function(){
        type = 1;
        updateChart(type, chart);
    });

    $("#graph").on('click', function(){
        type = 2;
        updateChart(type, chart);
    });

});


function updateChart(type, chart) {  
    $("#table").hide();
    var f = JSON.parse(json);
    var l,d,txt;
    if(type==0){
        l = f.methods.map(function(e) {return e.name;});
        d = f.methods.map(function(e) {return e.count;});
        txt = "Methods";
        //oops wrong question addfilters(type, l, d);
      } else if(type==1) {
        l = f.status.map(function(e) {return e.name;});
        d = f.status.map(function(e) {return e.count;});
        txt = "Response Codes";
        //addfilters(type, l, d);
      } else {
        l = ["a","b"];
        d = ["8","2"];
      }
    
    const c = palette('tol', d.length).map(function(hex) {return '#' + hex;});
    chart.data.datasets[0].data = d;
    chart.data.labels = l;
    chart.data.datasets[0].backgroundColor = c;
    chart.options.plugins.title.text = txt;
    chart.update();
    $("#xanax").show(); 
}


function showTable(type) {
  $("#table").empty();
  $("#xanax").hide();
  $("#table").show();
  var f = JSON.parse(json);
  var x ="";
  if(type==0){
    l = f.methods.map(function(e) {return e.name;});
    d = f.methods.map(function(e) {return e.count;});
    txt = "Methods";
    //oops wrong question addfilters(type, l, d);
  } else if(type==1) {
    l = f.status.map(function(e) {return e.name;});
    d = f.status.map(function(e) {return e.count;});
    txt = "Response Codes";
    //addfilters(type, l, d);
  } else {
    l = ["a","b"];
    d = ["8","2"];
  }

  x += "<table class='table table-bordered'><caption>"+txt+"</caption><table>";
  for(let i=0; i<l.length; i++) {
    x += "<tr><th scope='row'>"+l[i]+"</th><td>"+d[i]+"</td></tr>";
  }
  x +="</tbody>";

  $("#table").append(x);
}

/*
function addfilters(type, str, dt) {
  //empty filter div
  $("#filt").empty();
  i = 0;
  //populate filter div with the amount of labels from str
  let x ="<h6>filters</h6>";
  str.forEach(str => {
    x += '<li"><input type="checkbox" checked value="'+ str +'" id="f' +i+ '""><label for="'+str+'">'+str+'</label></li><br>';
    i++;
  });
  x += '<form><input type="button" class="btn btn-info" id="filterbtn" name="filter" value="Filter"></input></form>'; //filter button
  $("#filt").append(x);

  //add action to filter button
  $("#filterbtn").on('click', function(){
    //get array with checkbox values
    var z = [];
    for(let j=0; j<i; j++) {
      if($("#f"+j).is(":checked")) {z[j]="1";} 
      else {z[j]="0";}
        }
      console.log(z);

    //call filter function
    filterchart(z, str, dt);
    });
}

function filterchart(boxes, lbls, data){

}
*/