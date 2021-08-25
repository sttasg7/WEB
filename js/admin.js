var json;
var check = 0;

//use ajax to get data from backend
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
    $("#xanax").hide(); //hide both divs until any button is pressed
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
                display: true
              },
              tooltips: {
                enabled: true,
              },  
              plugins: {
                  title: {
                    display: true,
                    text: ""
                  },
                  tooltips: {
                    display: true,
                    position: 'top',
                    align: 'start',
                    reverse: true
                  }
              }
          }
    });
    

    //button actions. each button calls the corresponding function with their needed arguments
    var type = 0;  
    $("#basics").on('click', function(){
      basicInfo();
    })

    $("#methodstable").on('click', function(){
      type = 0;
      showTable(type);
    })

    $("#statusstable").on('click', function(){
      type = 1;
      showTable(type);
    })

    $("#agestable").on('click', function(){
      type = 2;
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

    $("#ages").on('click', function(){
        type = 2;
        updateChart(type, chart);
    });

});


function updateChart(type, chart) {  
    $("#table").hide();
    var f = JSON.parse(json);
    var l,d,txt,unit;
    //use type to determine which labels and data to be pushed to chart
    //l -> labels, d -> data, txt -> title, unit -> dataset label
    if(type==0){
        l = f.methods.map(function(e) {return e.name;});
        d = f.methods.map(function(e) {return e.count;});
        txt = "Methods";
        unit = 'Entries';
      } else if(type==1) {
        l = f.status.map(function(e) {return e.name;});
        d = f.status.map(function(e) {return e.count;});
        txt = "Response Codes";
        unit = 'Entries';
      } else if(type==2){
        l = f.ages.map(function(e) {return e.content;});
        d = f.ages.map(function(e) {return e.avg;});
        txt = "Average Age Per Content Type in msec";
        unit = 'Age';
      }
    
    
    const c = palette('mpn65', d.length).map(function(hex) {return '#' + hex;});
    chart.data.datasets[0].data = d;
    chart.data.labels = l;
    chart.data.datasets[0].label = unit;
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
  //use type to determine which labels and data to be pushed to chart
  //l -> labels, d -> data, txt -> title, v1 -> table column 1 header, v2 -> table column 2 header 
  if(type==0){
    l = f.methods.map(function(e) {return e.name;});
    d = f.methods.map(function(e) {return e.count;});
    txt = "Methods";
    v1 = "Methods";
    v2 = "Count";
  } else if(type==1) {
    l = f.status.map(function(e) {return e.name;});
    d = f.status.map(function(e) {return e.count;});
    txt = "Response Codes";
    v1 = "Code";
    v2 = "Count";
  } else if(type==2){
    l = f.ages.map(function(e) {return e.content;});
    d = f.ages.map(function(e) {return e.avg;});
    txt = "Average Age Per Content Type";
    v1 = "Content";
    v2 = "Average Age in msec"
  }

  x += "<table class='table table-bordered'><caption class='text-decoration-underline'>"+txt+"</caption><table class='table table-light'><tbody><tr><th scope='row' class='table-dark'>"+v1+"</th><th class='table-dark'>"+v2+"</th></tr>";
  for(let i=0; i<l.length; i++) {
    x += "<tr><td>"+l[i]+"</td><td>"+d[i]+"</td></tr>";
  }
  x +="</tbody></table>";

  $("#table").append(x);
}

function basicInfo() {
  $("#table").empty();
  $("#xanax").hide();
  $("#table").show();
  var f = JSON.parse(json);
  const users = f.counts[0].users - 1; //eclude admin
  const ISPs = f.counts[1].ISP;
  const domains = f.counts[1].domains;
  let x ="<div><b>Users registered:</b>   "+users+"<br><hr><b>Domains logged:</b>   "+domains+"<br><hr><b>ISPs logged:</b>   "+ISPs+"<br></div>";
  $("#table").append(x);
}