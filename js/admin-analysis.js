let json; //edw panw 8ewreitai global. 8a thn deis san orisma se diafores function, den xreiazotan. isws to ka8arisw kapoia stigmh
var filterList = new Array();
var hours = new Array();
var count = new Array();
var avg = new Array();
var chart;
var type = 1; //omoiws me json pio panw
var lookup;

  /* Se oles tis selides me grafhmata, h diadikasia einai idia:
  
  a. Fortwsh Selidas
  b. Klhsh mesw AJAX gia fortwsh twn dedomenwn apo get-admin.php se JSON.
  c. Perimenei ton xrhsth na epile3ei ti graph/table 8elei (to JSON einai idio gia ola ta grafhmata ka8e selidas)
  d. Prospelasi to JSON gia na vrei ta labels gia ta filtra kai ta kanei append sto #filt
  e. Perimenei ton xrhsth na epile3ei filters
  f. Molis pathsei Filter, ftiaxnoume lista filterList me ta apodekta dedomena (analoga poia filtra pathse).
  g. Sth synexeia kanoume prospelash olo to JSON grammh grammh kai pairnoume mono ta stoixeia pou symfwnoun me th lista filtrwn mas
  h. Ta vazoume sto chart kai kanoume chart.update()
  
  * An alla3ei graph/table 3anakanoume th diadikasia apo to d
  * An alla3ei filtra 3anakanoume apo to f
*/

$(document).ready(function() { //me to pou fortwsei olh h selida ksekinaei diadikasies
  ctgraphs(1); //pros8hsh default grafhmatos sto #mapid
  $("#filt").hide(); //ta hide edw einai gia na mhn fainontai sth selida mexri na pathsei o xrhsths ti 8elei
  $("#xanax").hide();
  $("#table").hide();

  //ta graph kanoun ola destroy to prohgoumeno graphma (anagkaio) kai meta analoga show/hide
  $("#ct_graph").on('click', function(){
    chart.destroy(); //destroy gia na ka8arisei to <canvas>, den se afhnei alliws
    ctgraphs(1); 
    $("#filt").show();
    $("#xanax").show(); //einai to div pou periexei to canvas gia ta graph, to onomasa xanax giati mou spase ta nevra sthn arxh :P :D
    $("#table").hide();
  });  

  $("#day_graph").on('click', function(){
    chart.destroy();
    ctgraphs(2);
    $("#filt").show();
    $("#xanax").show();
    $("#table").hide();
  });

  $("#method_graph").on('click', function(){
    chart.destroy();
    ctgraphs(3);
    $("#filt").show();
    $("#xanax").show();
    $("#table").hide();
  });

  $("#isp_graph").on('click', function(){
    chart.destroy();
    ctgraphs(4);
    $("#filt").show();
    $("#xanax").show();
    $("#table").hide();
  });

  //ta tables pairnoun stoixeia katey8eian apo to chart, opote ftiaxnoume to chart alla to exoume kryfo gia na fainetai mono to table
  $("#ct_table").on('click', function(){
    chart.destroy();
    ctgraphs(1);
    $("#filt").show();
    $("#xanax").hide();
    $("#table").show();
    cttables();
  });

  $("#day_table").on('click', function(){
    chart.destroy();
    ctgraphs(2);
    $("#filt").show();
    $("#xanax").hide();
    $("#table").show();
    cttables();
  });

  $("#method_table").on('click', function(){
    chart.destroy();
    ctgraphs(3);
    $("#filt").show();
    $("#xanax").hide();
    $("#table").show();
    cttables();
  });

  $("#isp_table").on('click', function(){
    chart.destroy();
    ctgraphs(4);
    $("#filt").show();
    $("#xanax").hide();
    $("#table").show();
    cttables();
  });
});


//edw auto isws den einai toso swsto, giati kanei AJAX ka8e fora pou allazeis grafhma. 
//sto admin-headers.js to kanw kalytera, ginetai mia fora sthn arxh kai telos.
function ctgraphs(type){ 
$.ajax({ 
    type: "POST",
    url: "../backend/get-admin.php",
    data: {
      type: 2      
    },
    cache: false,
    success: function(response){
      json = JSON.parse(response);
      addFilters(json, type);
      addChart();
    }
});


function addFilters(json, type) {
  var arr=[''];
  var j=0;
  if(type==1){lookup = "content"} //orizoume analoga to grafhma, ena lookup gia na vroume ta filtra mas
  else if(type==3){lookup = "method"} //px sto erwthma 3 kanoume filter by method. sto 2 einai by day, opote den xreiazetai lookup
  else if(type==4){lookup = "isp"}

  if(type == 2) { 
    /*
    prospelasi to arr ena ena kai kanoume ena filtro gia ka8e stoixeio me analogo id 
    px. <input type='checkbox' value='Monday' id='f0'>
    meta Tuesday f1, Wednesday f2 k.o.k
    */
    $("#filt").empty(); //empty to div gia na valoume ta nea filtra
    i = 0;
    arr = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday']; //gia to 2 ta filtra einai oi meres
    let x ="<div id='filters'><h3 align='center'>Filters</h3><hr><input type='button' value='Choose All' id='fall'><input type='button' value='Choose None' id='fnone'><hr>";
    arr.forEach(arr => {
      x += '<li"><input type="checkbox" value="'+ arr +'" id="f' +i+ '"">  '+arr+'</li><br>'; //ta kanoume lista (li)
      i++;
    });
    x += '<form><input type="button" class="btn btn-info" id="filterbtn" name="filter" value="Filter"></input></form></div>'; //filter button
    $("#filt").append(x); //push thn lista sto div gia na emfanistoun
  }
  else { //gia ta 1,3,4 ta filtra ta pairnoume apo to json me to lookup
    for (var i = 0; i < json.length; i++) {
      if($.inArray(json[i][lookup],arr)<0){ //me to inArray koitame an yparxei hdh to stoixeio sto arr, wste na mhn to valoume pali
        arr[j]=json[i][lookup];
        j++;
      }
    }
  
    $("#filt").empty(); 
    i = 0;
    let x ="<div id='filters'><h3 align='center'>Filters</h3><hr><input type='button' value='Choose All' id='fall'><input type='button' value='Choose None' id='fnone'><hr>";
    arr.forEach(arr => {
      x += '<li"><input type="checkbox" value="'+ arr +'" id="f' +i+ '"">  '+arr+'</li><br>';
      i++;
    });
    x += '<form><input type="button" class="btn btn-info" id="filterbtn" name="filter" value="Filter"></input></form></div>'; //filter button
    $("#filt").append(x);
  }
  
  
  $("#filterbtn").on('click', function(){ //pataei to Filter
    for(let j=0; j<i; j++) {//koitaei ola ta checkbox apo f0 ews fi
      let id = 'f' + j;
      let x = document.getElementById(id); 
      const found = arr.find(element => element == x.value); /* vriskei sth filterList th grammh me key to value tou filtrou
      h filterList einai assossiative array, anti gia 0,1,2,3 deiktes exei onomata, kapws etsi
      filterList:
          "GET"       : 0 
          "PUT"       : 0
          "POST"      : 1 
          "Monday"    : 0
          "text/html" : 0
          ktl
      opws vlepeis san deiktes mporei na exei apo ola ta diafora filtra
      */
      if(x.checked) {        
        filterList[found] = 1; //an einai check to checkbox kane thn timh 1
      } else {
        filterList[found] = 0;
      }
    } 
    updateChart(json, type); //afou eidame poia filtra einai pathmena, kaloume thn updateChart
  });
  
  $("#fall").on('click', function(){ //Choose All koumpi (gr. 155)
    for(t=0;t<=i;t++) {
      let id = "#f" + t;
      $(id).prop('checked', true);
    }
  });
  $("#fnone").on('click', function(){ //Choose None
    for(t=0;t<=i;t++) {
      let id = "#f" + t;
      $(id).prop('checked', false);
    }
  });


};



function updateChart(json, type) {
  for(t=0; t<24; t++) {
    hours[t] = 0; count[t] = 0; //mhdenhzoume tous pinakes pou metrane ta stoixeia gia to chart
  }
  
  json.forEach(json => {//prospelasi to json grammh-grammh
    //vriskoume thn mera kai thn wra apo to date
    let v = new Date(json.date); 
    let h = v.getHours();
    weekday = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    var n = weekday[v.getDay()];

    if(type==1){lookup = json.content} //pali analoga to erwthma vazoume ena lookup
    else if(type==2){lookup = n}
    else if(type==3){lookup = json.method} 
    else if(type==4){lookup = json.isp} 

    if(filterList[lookup]==1) { //3ana lookup mesa sthn filterList, an einai epilegmeno kanoume pros8hkh ta data
      hours[h] += parseInt(json.wait) || 0; //anagkaio to OR 0 giati polla json.wait einai undefined
      count[h] += 1;     
    }
  })

  avg = [];
  for(t=0;t<24;t++){
    let temp = hours[t]/count[t] || 0; //edw kanoume OR 0 giati kapoia count einai 0
    temp = Math.round(temp); //stroggylopoihsh na sw8oume apo ta dekadika
    avg.push(temp);
    chart.data.datasets[0].data = avg;    //orizoume sto datasets tou chart nea dedomena
    chart.update(); //kai kanoume update gia na thn emfanizei
    cttables();    
  }
}

function addChart() { //arxikopoihsh tou graph, einai idio se ola ta erwthmata
  let myChart = document.getElementById('ch1').getContext('2d');
    chart = new Chart(myChart, { //dhmiourgos, pairnei san orismata ena Element apo th selida kai ena Object me ta stoixeia (des chart.js documentation gia to ti mporoume na valoume)
        type: 'bar',
        data: {
          labels: ['00:00','01:00','02:00','03:00','04:00','05:00','06:00','07:00','08:00','09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00','19:00','20:00','21:00','22:00','23:00'],
          datasets:[{
            label: 'msec',
            data: [],
            borderWidth: 2,
            borderColor: "rgb(11,11,11)",
            backgroundColor: palette('mpn65', 24).map(function (hex) { return '#' + hex; }) //poly wraio tool pou vrhka, gia na vazei dynamika diafora xrwmata analoga tis steiles (edw 24)
          }]
        },
        options: {
          plugins: {  //ola auta mporoume na ta peira3oume dynamika kai na kanoume chart.update (gr. 235-236)
            title: { //apla se auto to erwthma einai stantar, opote ta orisa apo thn arxh 
              display: true,
              text: "Average Wait Per Time of Day (in msec)"
            }
          }
        }
      });
    }
}


function cttables() { //gia ta tables
  $("#table").empty();
  let data = chart.data.datasets[0].data || undefined; //pairnoume ta stoixeia apo to chart, gia auto exoume to chart na trexei apo pisw alla krymeno ->  $("#xanax").hide();
  let labels = chart.data.labels || undefined; 
  let txt = 'Wait';
  v1 = " Time of Day ";
  v2 = "Avg Wait<br>(msec)"
  let x = '';
  x += "<table class='table table-bordered'><table><tbody><tr><th scope='row'>"+v1+"</th><th>"+v2+"</th></tr>";
  for(let i=0; i<24; i++) {
    x += "<tr><td>"+labels[i]+"</td><td>"+data[i]+"</td></tr>";
  }
  x +="</tbody>";

  $("#table").append(x);
}
