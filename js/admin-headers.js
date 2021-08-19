var filterList = new Array();
let type = 5; //1 for a, 2 for b, 5 for c
var chart;
let json;

$(document).ready(function () {
  addChartA();
  $("#filt").hide();
  $("#xanax").hide();
  $("#table").hide();
  load();

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
  $("#filt").empty();

  var arr = [''];
  var arr2 = [''];
  for (var k = 0; k < json.length; k++) {
    if ($.inArray(json[k]["content"], arr) < 0) {
      arr[k] = json[k]["content"];
      k++;
    }
  };

  for (k = 0; k < json.length; k++) {
    if ($.inArray(json[k]["isp"], arr2) < 0) {
      arr2[k] = json[k]["isp"];
      k++;
    }
  };

  let i = 0; let j = 0;
  let x = "<div id='filters'><h3 align='center'>Filters</h3><form class='d-flex justify-content-md-center'><input  type='button' class='btn btn-info' id='filterbtn' name='filter' value='Apply'></input></form><hr><input type='button' class='btn btn-secondary btn-sm' value='Choose All' id='fall' style='margin-left: 5px;'><input type='button' class='btn btn-secondary btn-sm' value='Choose None' id='fnone' style='margin-left: 10px;'><hr>";
  arr.forEach(arr => {
    x += '<li"><input type="checkbox" class="form-check-input" value="' + arr + '" id="f' + i + '"">  ' + arr + '</li><br>';
    i++;
  });
  x += '</div><hr><h4 align="center">Filter by ISP</h4>';

  x += "<div id='ispfilters'><input type='button' class='btn btn-secondary btn-sm' value='Choose All' id='ispall' style='margin-left: 5px;'><input type='button' class='btn btn-secondary btn-sm' value='Choose None' id='ispnone' style='margin-left: 10px;'><hr>";
  arr2.forEach(arr2 => {
    x += '<li"><input type="checkbox" class="form-check-input" value="' + arr2 + '" id="isp' + j + '"">  ' + arr2 + '</li><br>';
    j++;
  });
  x += '</div>';




  $("#filt").append(x);

  //add action to filter button
  $("#filterbtn").on('click', function () {
    for (let k = 0; k < i; k++) {
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

  $("#fall").on('click', function () {
    for (t = 0; t <= i; t++) {
      let id = "#f" + t;
      $(id).prop('checked', true);
    }
  });

  $("#fnone").on('click', function () {
    for (t = 0; t <= i; t++) {
      let id = "#f" + t;
      $(id).prop('checked', false);
    }
  });

  $("#ispall").on('click', function () {
    for (t = 0; t <= i; t++) {
      let id = "#isp" + t;
      $(id).prop('checked', true);
    }
  });
  $("#ispnone").on('click', function () {
    for (t = 0; t <= i; t++) {
      let id = "#isp" + t;
      $(id).prop('checked', false);
    }
  });
};


function updateChart() {
  let ttlarray = new Array();
  let maxttl = 0;
  let bucket = new String();
  if (type == 1) {
    json.forEach(json => {
      let dt = new Date(json.date);
      let exp = new Date(json.expires);

      if (filterList[json.content] == 1 && filterList[json.isp] == 1) {
        if (json.cache.includes("max-age")) {
          let x = json.cache.lastIndexOf("max-age=") + 8;
          let temp = json.cache.substring(x, json.cache.length);
          let maxage = temp.split('=').pop().split(',')[0];
          ttl = parseInt(maxage) || 0;
          ttl = Math.max(ttl, 0);
          if (ttl > 0) { ttlarray.push(ttl); }
          maxttl = Math.max(maxttl, ttl);
        } else if (json.expires) {
          if (json.date) {
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


    bucket = [];
    for (let k = 1; k < 12; k++) {
      bucket.push(humanizeDuration(maxttl / 10 * k, {largest: 2 }));
    }
    

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

  } else if (type == 2) {
    let maxstale = 0;
    let minfresh = 0;
    let count = 0;
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
    xxxxx.push(pct_fresh, pct_stale, 100-pct_fresh-pct_stale);
    chart.data.datasets[0].data = xxxxx;
    chart.data.labels = ["Min-Fresh", "Max-Stale", "Neither"];
    chart.options.plugins.title.text = "Percentage of directives";
    chart.options.plugins.title.diplay = true;
    chart.data.datasets[0].backgroundColor = palette('tol', 3).map(function (hex) { return '#' + hex; });
    chart.update();
    tablesB();

  } else if (type == 5) {
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
    if(data[i]==data[i-1] || data[i]==0 || data[i]==undefined) {} else {
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
    if(data[i]==data[i-1] || data[i]==0) {} else {
      x += "<tr><td>"+labels[i]+"</td><td>"+(Math.round(data[i] * 100) / 100).toFixed(2);+"</td></tr>";
    }
  }
  x +="</tbody></table>";

  $("#table").append(x);
}
