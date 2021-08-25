var filterList = new Array();
let type = 5; //1 for a, 2 for b, 5 for c
var chart;
let json;

$(document).ready(function () {
  addChartA();
  $("#filt").hide();
  $("#xanax").hide();
  $("#table").hide();
  load(); //load on success calls addFilters(). no need to call it again, since the filters are the same on all graphs.

  //we have three divs on our page. 
  //Filters -> #filt. Graphs -> #xanax. Tables -> #table.
  //through the process the graphs are always active but sometimes hidden. Tables get the data from graphs datasets.
  //Every button uses a chart.destroy() method to clear the canvas and fill it with the new graph  
  //Tables buttons uses a $("#table").empty() for the same reason

  //Graphs buttons
  $("#ttl_graph").on('click', function () {
    chart.destroy();
    type = 1;
    addChartA();    
    $("#filt").show();
    $("#xanax").show();
    $("#table").hide();
  });

  $("#stale_graph").on('click', function () {
    chart.destroy();
    type = 2;
    addChartB();
    $("#filt").show();
    $("#xanax").show();
    $("#table").hide();
  });

  $("#cache_graph").on('click', function () {
    chart.destroy();
    type = 5;
    addChartB();
    $("#filt").show();
    $("#xanax").show();
    $("#table").hide();
  });

  //Tables buttons
  $("#ttl_table").on('click', function () {
    chart.destroy();
    type = 1;
    addChartA();
    $("#table").empty();   
    $("#filt").show();
    $("#xanax").hide();
    $("#table").show();
  });

  $("#stale_table").on('click', function () {
    chart.destroy();
    type = 2;
    addChartB();
    $("#table").empty();
    $("#filt").show();
    $("#xanax").hide();
    $("#table").show();
  });

  $("#cache_table").on('click', function () {
    chart.destroy();
    type = 5;
    addChartB();
    $("#table").empty();
    $("#filt").show();
    $("#xanax").hide();
    $("#table").show();
  });

});


//load data needed from backend
function load() {
  $.ajax({
    url: "../backend/get-admin.php",
    type: "POST",
    data: {
      type: 3
    },
    cache: false,
    success: function (response) {
      json = JSON.parse(response);
      addFilters();
    }
  });

};


function addFilters() {
  $("#filt").empty(); //empty filters div to append new filters

  var arr = [''];
  var arr2 = [''];
  
  //create an array arr with all unique content-types
  for (var k = 0; k < json.length; k++) {
    if ($.inArray(json[k]["content"], arr) < 0) {
      arr[k] = json[k]["content"];
      k++;
    }
  };

  //and an array arr2 with all unique ISPs
  for (k = 0; k < json.length; k++) {
    if ($.inArray(json[k]["isp"], arr2) < 0) {
      arr2[k] = json[k]["isp"];
      k++;
    }
  };

  let i = 0; let j = 0;
  //add filter header and Apply button for content type
  let x = "<div id='filters'><h3 align='center'>Filters</h3><form class='d-flex justify-content-md-center'><input  type='button' class='btn btn-info' id='filterbtn' name='filter' value='Apply'></input></form><hr><div style='width:100%; text-align:center;'><input type='button' class='btn btn-secondary btn-sm' value='Choose All' id='fall' style='margin-left: 5px; display:inline-block;'><input type='button' class='btn btn-secondary btn-sm' value='Choose None' id='fnone' style='margin-left: 8px; display: inline-block;'></div><hr>";
  arr.forEach(arr => {
    //add checkbox filter for every unique content type with distinct ids
    x += '<li"><input type="checkbox" class="form-check-input" value="' + arr + '" id="f' + i + '"">  ' + arr + '</li><br>';
    i++;
  });

  //ISP filters
  x += '</div><hr><h4 align="center">Filter by ISP</h4>';  
  x += "<div id='ispfilters'><div style='width:100%; text-align:center;'><input type='button' class='btn btn-secondary btn-sm' value='Choose All' id='ispall' style='margin-left: 5px; display: inline-block;'><input type='button' class='btn btn-secondary btn-sm' value='Choose None' id='ispnone' style='margin-left: 10px; display: inline-block;'></div><hr>";
  arr2.forEach(arr2 => {
    x += '<li"><input type="checkbox" class="form-check-input" value="' + arr2 + '" id="isp' + j + '"">  ' + arr2 + '</li><br>';
    j++;
  });
  x += '</div>';

  $("#filt").append(x);


  //add action to filter button
  $("#filterbtn").on('click', function () {
    for (let k = 0; k < i; k++) {
      //check all Content-Type checkboxes and update their status on filterList array
      let id = 'f' + k;
      let x = document.getElementById(id);
      const found = arr.find(element => element == x.value);
      if (x.checked) {
        filterList[found] = 1;
      } else {
        filterList[found] = 0;
      }
    };
    for (let k = 0; k < j; k++) {
      //check all ISP checkboxes and update their status on filterList array
      let id = 'isp' + k;
      let x = document.getElementById(id);
      const found = arr2.find(element => element == x.value);
      if (x.checked) {
        filterList[found] = 1;
      } else {
        filterList[found] = 0;
      }
    };
    updateChart();
  });

  $("#fall").on('click', function () { //"check" all checkboxes
    for (t = 0; t <= i; t++) {
      let id = "#f" + t;
      $(id).prop('checked', true);
    }
  });

  $("#fnone").on('click', function () { //"uncheck" all checkboxes
    for (t = 0; t <= i; t++) {
      let id = "#f" + t;
      $(id).prop('checked', false);
    }
  });

  $("#ispall").on('click', function () { //"check" all checkboxes
    for (t = 0; t <= i; t++) {
      let id = "#isp" + t;
      $(id).prop('checked', true);
    }
  });
  $("#ispnone").on('click', function () { //"uncheck" all checkboxes
    for (t = 0; t <= i; t++) {
      let id = "#isp" + t;
      $(id).prop('checked', false);
    }
  });
};


//when the Apply button is pressed, filterList gets updated and we run the new data on the chart
function updateChart() {
  let ttlarray = new Array();
  let maxttl = 0;
  let bucket = new String();
  if (type == 1) { // 1 is for max-age chart
    json.forEach(json => { 
      //check if element matches both filters
      if (filterList[json.content] == 1 && filterList[json.isp] == 1) {

        if (json.cache.includes("max-age")) { //check if max-age exists
          //we find "max-age" index in json.cache and skip the next "max-age".length == 8 characters
          //then we use string methods substring, pop, split to get the exact value
          let x = json.cache.lastIndexOf("max-age=") + 8; 
          let temp = json.cache.substring(x, json.cache.length);
          let maxage = temp.split('=').pop().split(',')[0];
          ttl = parseInt(maxage) || 0;
          ttl = Math.max(ttl, 0); //we set negatives to 0
          if (ttl > 0) { ttlarray.push(ttl); }
          maxttl = Math.max(maxttl, ttl);
        } 
        else if (json.expires) {//if max-age doesnt exist, we use expires and last-modified
          
          if (json.date) {//if that fails too, we skip the entry
            let dt = new Date(json.date);
            let exp = new Date(json.expires);
            ttl = (exp - dt) || 0;
            ttl = Math.max(ttl, 0);
            if (ttl > 0) { ttlarray.push(ttl); }
            maxttl = Math.max(maxttl, ttl);
          }
        }
      }
    });

    //using the maxttl value, we create 10 buckets of equal size
    bucket = [];
    for (let k = 1; k < 12; k++) {
      bucket.push(humanizeDuration(maxttl / 10 * k, {largest: 2 }));
    }
    
    //we place items in the correct bucket
    let count = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    ttlarray.forEach(e => {
      if (e <= maxttl / 10) { count[0]++; return; }
      if (e <= maxttl / 10 * 2) { count[1]++; return; }
      if (e <= maxttl / 10 * 3) { count[2]++; return; }
      if (e <= maxttl / 10 * 4) { count[3]++; return; }
      if (e <= maxttl / 10 * 5) { count[4]++; return; }
      if (e <= maxttl / 10 * 6) { count[5]++; return; }
      if (e <= maxttl / 10 * 7) { count[6]++; return; }
      if (e <= maxttl / 10 * 8) { count[7]++; return; }
      if (e <= maxttl / 10 * 9) { count[8]++; return; }
      if (e <= maxttl / 10 * 10) { count[9]++; return; }
    });

    chart.data.labels = bucket;
    chart.data.datasets[0].data = count;
    chart.update();
    tablesA();

  } else if (type == 2) { //2 is for max-stale, min-fresh
    let maxstale = 0;
    let minfresh = 0;
    let count = 0;

    //we check filterList and use json elements that match both filter only
    json.forEach(json => {
      if (filterList[json.content] == 1 && filterList[json.isp] == 1) {
        if (json.cache.includes("max-stale")) { maxstale++; }
        if (json.cache.includes("min-fresh")) { minfresh++; }
        count++;
      }
    });
    let xxxxx = [];
    let pct_stale = (maxstale / count) || 0;
    let pct_fresh = (minfresh / count) || 0;
    xxxxx.push(pct_fresh, pct_stale, 100-pct_fresh-pct_stale); //since we use doughnut with percentages, it makes sense to add a third value "Neither" so they add up to 100%
    chart.data.datasets[0].data = xxxxx;
    chart.data.labels = ["Min-Fresh", "Max-Stale", "Neither"];
    chart.options.plugins.title.text = "Percentage of directives";
    chart.options.plugins.title.diplay = true;
    chart.data.datasets[0].backgroundColor = palette('tol', 3).map(function (hex) { return '#' + hex; });
    chart.update();
    tablesB();

  } else if (type == 5) { //5 is for cache directives. similar process to type == 2
    let public = 0;
    let private = 0;
    let nocache = 0;
    let nostore = 0;
    let count = 0;
    json.forEach(json => {
      if (filterList[json.content] == 1 && filterList[json.isp] == 1) {
        if (json.cache.includes("public")) { public++; }
        if (json.cache.includes("private")) { private++; }
        if (json.cache.includes("no-cache")) { nocache++; }
        if (json.cache.includes("no-store")) { nostore++; }
        count++;
      }
    });
    let x = [];
    let pct_public = 100 * (public / count) || 0;
    let pct_private = 100 * (private / count) || 0;
    let pct_nocache = 100 * (nocache / count) || 0;
    let pct_nostore = 100 * (nostore / count) || 0;
    let pct_none = 100 - pct_public - pct_private - pct_nocache - pct_nostore;
    x.push(pct_public, pct_private, pct_nocache, pct_nostore, pct_none);
    chart.data.datasets[0].data = x;
    chart.data.labels = ["Public", "Private", "No Cache", "No Store", "No directive"];
    chart.options.plugins.title.text = "Percentage of directives"
    chart.data.datasets[0].backgroundColor = palette('tol', 5).map(function (hex) { return '#' + hex; });
    chart.options.plugins.title.diplay = true;
    chart.update();
    tablesB();
  }

}


function addChartA() {
  let myChart = document.getElementById('ch1').getContext('2d');
  chart = new Chart(myChart, {
    type: 'bar',
    data: {
      labels: ["apply filters"],
      datasets: [{
        label: 'Age (less than)',
        backgroundColor: "rgb(255, 0, 0)",
        borderColor: 'rgba(255, 0, 0, 0.6)',
        borderWidth: 1,
        data: [],

      }]
    },
    options: {
      scales: {
        xAxes: [{
          display: true,
          barPercentage: 1.9,
          ticks: {
              max: 3,
          }
       }, {
         display: true,
         ticks: {
           autoSkip: false,
           max: 4,
          }
        }],
        yAxes: [{
          ticks: {
            beginAtZero:true
          }
        }]
      }
    }
  });
};

function addChartB() {
  let myChart = document.getElementById('ch1').getContext('2d');
  chart = new Chart(myChart, {
    type: 'doughnut',
    data: {
      labels: ["apply filters"],
      datasets: [{
        label: "Percentage",
        borderColor: "rgb(11,11,11)",
        backgroundColor: "rgb(11,11,11)",
        borderWidth: 1,
        data: [],

      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: false,
          text: ''
        }
      }

    }
  });
};

function tablesA() {
  $("#table").empty();
  let data = chart.data.datasets[0].data || undefined; 
  let labels = chart.data.labels || undefined; 
  let txt = 'Wait';
  v1 = "Age<br>(seconds)";
  v2 = "# of entries"
  let x = '';
  x += "<table id='tableid' class='table table-bordered table-light'><tbody><tr><th scope='row' class='table-dark'>"+v1+"</th><th class='table-dark'>"+v2+"</th></tr>";
  for(let i=0; i<10; i++) {
    if(data[i]==data[i-1] || data[i]==0 || data[i]==undefined) {} else { //skip empty values
    x += "<tr><td>"+labels[i]+" or less</td><td>"+data[i]+"</td></tr>";
    }
  }
  x +="</tbody></table>";

  $("#table").append(x);
}

function tablesB() {
  $("#table").empty();
  let data = chart.data.datasets[0].data || undefined; 
  let labels = chart.data.labels || undefined;
  v1 = "Directive";
  v2 = "% of entries"
  let x = '';
  x += "<table id='tableid' class='table table-bordered table-light'><tbody><tr><th scope='row' class='table-dark'>"+v1+"</th><th class='table-dark'>"+v2+"</th></tr>";
  for(let i=0; i<labels.length; i++) {
    if(data[i]==data[i-1] || data[i]==0) {} else { //skip empty values
      x += "<tr><td>"+labels[i]+"</td><td>"+(Math.round(data[i] * 100) / 100).toFixed(2);+"</td></tr>"; //use toFixed to limit float numbers to 2 decimals
    }
  }
  x +="</tbody></table>";

  $("#table").append(x);
}
