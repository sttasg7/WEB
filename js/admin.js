var json;
var check = 0;

//Ajax sthn arxh na paroume dedomena
$.ajax({
    type: "POST",
    url: "../backend/get-admin.php",
    data: {
      type: 1
    },
    cache: false,
    success: function(response){
      json = response; //edw to xrhsimopoiw san global
    }
  });

//an diavases to admin-analysis, ta parakatw einai apla, idia diadikasia
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
    if(type==0){
        l = f.methods.map(function(e) {return e.name;});
        d = f.methods.map(function(e) {return e.count;});
        txt = "Methods";
        unit = 'Entries';
        //oops wrong question addfilters(type, l, d);
      } else if(type==1) {
        l = f.status.map(function(e) {return e.name;});
        d = f.status.map(function(e) {return e.count;});
        txt = "Response Codes";
        unit = 'Entries';
        //addfilters(type, l, d);
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
  if(type==0){
    l = f.methods.map(function(e) {return e.name;});
    d = f.methods.map(function(e) {return e.count;});
    txt = "Methods";
    v1 = "Methods";
    v2 = "Count";
    //oops wrong question addfilters(type, l, d);
  } else if(type==1) {
    l = f.status.map(function(e) {return e.name;});
    d = f.status.map(function(e) {return e.count;});
    txt = "Response Codes";
    v1 = "Code";
    v2 = "Count";
    //addfilters(type, l, d);
  } else if(type==2){
    l = f.ages.map(function(e) {return e.content;});
    d = f.ages.map(function(e) {return e.avg;});
    txt = "Average Age Per Content Type";
    v1 = "Content";
    v2 = "Average Age in msec"
  }

  x += "<table class='table table-bordered'><caption>"+txt+"</caption><table><tbody><tr><th scope='row'>"+v1+"</th><th>"+v2+"</th></tr>";
  for(let i=0; i<l.length; i++) {
    x += "<tr><td>"+l[i]+"</td><td>"+d[i]+"</td></tr>";
  }
  x +="</tbody>";

  $("#table").append(x);
}

function basicInfo() {
  $("#table").empty();
  $("#xanax").hide();
  $("#table").show();
  var f = JSON.parse(json);
  const users = f.counts[0].users;
  const ISPs = f.counts[1].ISP;
  const domains = f.counts[1].domains;
  let x ="<div><b>Users registered:</b>   "+users+"<br><hr><b>Domains logged:</b>   "+domains+"<br><hr><b>ISPs logged:</b>   "+ISPs+"<br></div>";
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