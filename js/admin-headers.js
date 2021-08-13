var filterList = new Array();
let type = 5; //1 for a, 2 for b, 5 for c
var chart;
let json; //des admin-analysis.js ti grafw gia ayto kai to type, edw nomizw einai kalytera san global

$(document).ready(function () {
  addChartA();
  $("#filt").hide();
  $("#xanax").hide();
  $("#table").hide();
  load(); //admin-analysis.js grammh 103. ginetai mia fora to load() edw, mou fainetai swstotero


  //edw ta koumpia einai 95% idia me to admin-analysis, des ekei gia ekshghsh. monh diafora oti ta graph den einai idia se ola ta erwthmata
  //gia ayto yparxoyn addChartA kai B (kai TablesA kai B). A -> erwthma 1, B -> 2-3
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
    addChartA();
    type = 1;
    updateChart(json, 1);
    $("#filt").show();
    $("#xanax").hide();
    $("#table").show();
    tablesA();
  });

  $("#stale_table").on('click', function () {
    chart.destroy();
    type = 2;
    addChartB();
    $("#filt").show();
    $("#xanax").hide();
    $("#table").show();
    tablesB();
  });

  $("#cache_table").on('click', function () {
    chart.destroy();
    type = 5;
    addChartB();
    $("#filt").show();
    $("#xanax").hide();
    $("#table").show();
    tablesB();
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
      addFilters(json);
    }
  });

};


function addFilters(json) { //idia logikh me to admin-analysis, des ekei
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
  let x = "<div id='filters'><h3 align='center'>Filters</h3><form class='d-flex justify-content-md-center'><input  type='button' class='btn btn-info' id='filterbtn' name='filter' value='Apply'></input></form><hr><input type='button' value='Choose All' id='fall'><input type='button' value='Choose None' id='fnone'><hr>";
  arr.forEach(arr => {
    x += '<li"><input type="checkbox" value="' + arr + '" id="f' + i + '"">  ' + arr + '</li><br>';
    i++;
  });
  x += '</div><hr>Filter by ISP';

  x += "<div id='ispfilters'><input type='button' value='Choose All' id='ispall'><input type='button' value='Choose None' id='ispnone'><hr>";
  arr2.forEach(arr2 => {
    x += '<li"><input type="checkbox" value="' + arr2 + '" id="isp' + j + '"">  ' + arr2 + '</li><br>';
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
    updateChart(json, type);
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


function updateChart(json, type) {
  let ttlarray = new Array();
  let maxttl = 0;
  let bucket = new String();
  if (type == 1) {
    json.forEach(json => {
      let dt = new Date(json.date); //den xreiazontai auta, ta kanw parakatw
      let exp = new Date(json.expires); //den xreiazontai auta, ta kanw parakatw

      if (filterList[json.content] == 1 && filterList[json.isp] == 1) { //edw einai dyo filtra (Content_Type / ISP) opote koitame kai ta dyo
        if (json.cache.includes("max-age")) {
          /* 
          twra koitame an yparxei sto cache_control h directiva max-age
          epeidh to cache_control periexei polla directives, kanoume diafora string methods gia na paroume mono auto pou 8eloume
          */
          let x = json.cache.lastIndexOf("max-age=") + 8;
          let temp = json.cache.substring(x, json.cache.length);
          let maxage = temp.split('=').pop().split(',')[0]; //mhn rwthseis kan pws to vrhka, evala ena console.log(maxage) kai dokimasa 40 methods
          ttl = parseInt(maxage) || 0; //apofeygoume ta undefined
          ttl = Math.max(ttl, 0); //kapoia exoun arnhtikes times
          if (ttl > 0) { ttlarray.push(ttl); }
          maxttl = Math.max(maxttl, ttl);
        }
        else if (json.expires) { //paromoia fash me max-age, koitame an yparxei to expires
          if (json.date) { //kai to last-modified
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

    //vrhkame (gr.209, 217) to megalytero TTL opote kanoume 10 buckets me mege8os maxttl/10
    bucket = [];
    for (let k = 1; k < 12; k++) {
      bucket.push(humanizeDuration(maxttl / 10 * k, { largest: 2 })); //humanizeDuration apo to human-times.js gia na mas dwsei mono xronia kai mhnes      
    }

    let count = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    ttlarray.forEach(e => { //ftiaxame (gr.208, 216) ena array "ttlarray" me ola ta TTL kai twra ta vazoume se buckets
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
    tablesA(); /* doulevei diaforetika apo to admin-analysis
    ekei ka8e table eftiaxne to chart kai epairne stoixeia apo ekei
    edw ka8e chart ftiaxnei to table gia na einai etoimo

    MALLON EDW LHPEI MIA if pou trexei to tablesA() 'h to tablesB() analoga to type. gia auto den emfanizei ton pinaka. 
    */

  } else if (type == 2) { //erwthma 2. pio aplo apo to erwthma 1, 8elei apla pososto
    let maxstale = 0;
    let minfresh = 0;
    let count = 0;
    json.forEach(json => {
      if (filterList[json.content] == 1 && filterList[json.isp] == 1) {
        if (json.cache.includes("max-stale")) { maxstale++; } //opote kanoume apla metrhma ola ta includes
        if (json.cache.includes("min-fresh")) { minfresh++; }
        count++;
      }
    });
    let xxxxx = [];
    let pct_stale = (maxstale / count) || 0;
    let pct_fresh = (minfresh / count) || 0;
    xxxxx.push(pct_fresh, pct_stale);
    chart.data.datasets[0].data = xxxxx;
    chart.update();

  } else if (type == 5) { //omoiws me to erwthma 2
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
    chart.update();
  }

}

//ta alla pio katw einai apla ta grafhmata
function addChartA() {
  let myChart = document.getElementById('ch1').getContext('2d');
  chart = new Chart(myChart, {
    type: 'bar',
    data: {
      labels: [0],
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
            beginAtZero: true
          }
        }]
      }
    }
  });
};

function addChartB() {
  const c = palette('tol', type).map(function (hex) { return '#' + hex; }); //edw fainetai giati exw to type = 5 gia to erwthma 3, glytwsa mia if :P
  let myChart = document.getElementById('ch1').getContext('2d');
  chart = new Chart(myChart, {
    type: 'doughnut',
    data: {
      labels: ["max-stale", "min-fresh"],
      datasets: [{
        label: "Percentage",
        borderColor: "rgb(11,11,11)",
        backgroundColor: c,
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
          display: true,
          text: 'Percentage of max-stale and min-fresh directives'
        }
      }

    }
  });
};

function tablesA() {
  $("#table").empty();
  let data = chart.data.datasets[0].data || undefined;
  let labels = chart.data.labels || undefined;
  console.log(data, labels);
  let txt = 'Wait';
  v1 = "Age<br>(seconds)";
  v2 = "# of entries"
  let x = '';
  x += "<table class='table table-bordered'><table><tbody><tr><th scope='row'>" + v1 + "</th><th>" + v2 + "</th></tr>";
  for (let i = 0; i < 10; i++) {
    if (data[i] == data[i - 1] || data[i] == 0) {

    } else {
      x += "<tr><td>" + humanizeDuration(labels[i]) + " or less</td><td>" + data[i] + "</td></tr>";
    }
  }
  x += "</tbody>";

  $("#table").append(x);
}

function tablesB() {
  $("#table").empty();
  let data = chart.data.datasets[0].data || undefined;
  let labels = chart.data.labels || undefined;
  v1 = "Directive";
  v2 = "% of entries"
  let x = '';
  x += "<table class='table table-bordered'><table><tbody><tr><th scope='row'>" + v1 + "</th><th>" + v2 + "</th></tr>";
  for (let i = 0; i < 10; i++) {
    if (data[i] == data[i - 1] || data[i] == 0) { } else {
      x += "<tr><td>" + humanizeDuration(labels[i]) + " or less</td><td>" + data[i] + "</td></tr>";
    }
  }
  x += "</tbody>";

  $("#table").append(x);
}
