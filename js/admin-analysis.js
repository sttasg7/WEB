let json;
var filterList = new Array();
var hours = new Array();
var count = new Array();
var avg = new Array();
var chart;
var type = 1;
var lookup;

$(document).ready(function () {
  addChart();
  graphs();
  $("#filt").hide();
  $("#xanax").hide();
  $("#table").hide();

  $("#ct_graph").on('click', function () {
    chart.destroy();
    type = 1;
    addChart();
    addFilters();
    $("#filt").show();
    $("#xanax").show();
    $("#table").hide();
  });

  $("#day_graph").on('click', function () {
    chart.destroy();
    type = 2;
    addChart();
    addFilters();
    $("#filt").show();
    $("#xanax").show();
    $("#table").hide();
  });

  $("#method_graph").on('click', function () {
    chart.destroy();
    type = 3;
    addChart();
    addFilters();
    $("#filt").show();
    $("#xanax").show();
    $("#table").hide();
  });

  $("#isp_graph").on('click', function () {
    chart.destroy();
    type = 4;
    addChart();
    addFilters();
    $("#filt").show();
    $("#xanax").show();
    $("#table").hide();
  });

  $("#ct_table").on('click', function () {
    chart.destroy();
    type = 1;
    addChart();
    addFilters();
    $("#filt").show();
    $("#xanax").hide();
    $("#table").show();
  });

  $("#day_table").on('click', function () {
    chart.destroy();
    type = 2;
    addChart();
    addFilters();
    $("#filt").show();
    $("#xanax").hide();
    $("#table").show();
  });

  $("#method_table").on('click', function () {
    chart.destroy();
    type = 3;
    addChart();
    addFilters();
    $("#filt").show();
    $("#xanax").hide();
    $("#table").show();
  });

  $("#isp_table").on('click', function () {
    chart.destroy();
    type = 4;
    addChart();
    addFilters();
    $("#filt").show();
    $("#xanax").hide();
    $("#table").show();
  });
});


function graphs() {
  $.ajax({
    type: "POST",
    url: "../backend/get-admin.php",
    data: {
      type: 2
    },
    cache: false,
    success: function (response) {
      json = JSON.parse(response);
      addFilters();
    }
  });
}

function addFilters() {
  var arr = [''];
  var j = 0;
  if (type == 1) {
    lookup = "content"
  } else if (type == 3) {
    lookup = "method"
  } else if (type == 4) {
    lookup = "isp"
  }

  if (type == 2) {
    $("#filt").empty();
    i = 0;
    arr = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    let x = "<div id='filters'><h3 align='center'>Filters</h3><form class='d-flex justify-content-md-center'><input type='button' class='btn btn-info' id='filterbtn' name='filter' value='Apply'></input></form><hr><input type='button' class='btn btn-secondary btn-sm' value='Choose All' id='fall' style='margin-left: 5px;'><input type='button' class='btn btn-secondary btn-sm' value='Choose None' id='fnone' style='margin-left: 10px;'><hr>";



    arr.forEach(arr => {
      x += '<li"><input class="form-check-input" type="checkbox" value="' + arr + '" id="f' + i + '"">  ' + arr + '</li><br>';
      

    
      i++;
    });
    x += '</div>'; //filter button
    $("#filt").append(x);
  } else {
    for (var i = 0; i < json.length; i++) {
      if ($.inArray(json[i][lookup], arr) < 0) {
        arr[j] = json[i][lookup];
        j++;
      }
    }

    $("#filt").empty();
    i = 0;
    let x = "<div id='filters'><h3 align='center'>Filters</h3><form class='d-flex justify-content-md-center'><input type='button' class='btn btn-info' id='filterbtn' name='filter' value='Apply'></input></form><hr><input type='button' class='btn btn-secondary btn-sm' value='Choose All' id='fall' style='margin-left: 5px;'><input type='button' class='btn btn-secondary btn-sm' value='Choose None' id='fnone' style='margin-left: 10px;'><hr>";
    arr.forEach(arr => {
      x += '<li"><input class="form-check-input" type="checkbox" value="' + arr + '" id="f' + i + '"">  ' + arr + '</li><br>';
      i++;
    });
    x += '</div>'; //filter button
    $("#filt").append(x);
  }



  //add action to filter button
  $("#filterbtn").on('click', function () {
    for (let j = 0; j < i; j++) {
      let id = 'f' + j;
      let x = document.getElementById(id);
      const found = arr.find(element => element == x.value);
      if (x.checked) {
        filterList[found] = 1;
      } else {
        filterList[found] = 0;
      }
    }
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


};



function updateChart() {
  for (t = 0; t < 24; t++) {
    hours[t] = 0;
    count[t] = 0;
  }

  json.forEach(json => {
    let v = new Date(json.date);
    let h = v.getHours();
    weekday = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    var n = weekday[v.getDay()];

    if (type == 1) {
      lookup = json.content
    } else if (type == 2) {
      lookup = n
    } else if (type == 3) {
      lookup = json.method
    } else if (type == 4) {
      lookup = json.isp
    }

    if (filterList[lookup] == 1) {
      hours[h] += parseInt(json.wait) || 0;
      count[h] += 1;
    }
  })

  avg = [];
  for (t = 0; t < 24; t++) {
    let temp = hours[t] / count[t] || 0;
    temp = Math.round(temp);
    avg.push(temp);
    chart.data.datasets[0].data = avg;
    chart.update();
    tables();
  }
}

function addChart() {
  let myChart = document.getElementById('ch1').getContext('2d');
  chart = new Chart(myChart, {
    type: 'bar',
    data: {
      labels: ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'],
      datasets: [{
        label: 'msec',
        data: [],
        borderWidth: 2,
        borderColor: "rgb(11,11,11)",
        backgroundColor: palette('mpn65', 24).map(function (hex) {
          return '#' + hex;
        })
      }]
    },
    options: {
      plugins: {
        title: {
          display: true,
          text: "Average Wait Per Time of Day (in msec)"
        }
      }
    }
  });
}

function tables() {
  $("#table").empty();
  let data = chart.data.datasets[0].data || undefined;
  let labels = chart.data.labels || undefined;
  let txt = 'Wait';
  v1 = " Time of Day ";
  v2 = "Avg Wait<br>(msec)"
  let x = '';
  x += "<table class='table table-borderless table-light'><tbody><tr><th scope='row' class='table-dark'>" + v1 + "</th><th class='table-dark'>" + v2 + "</th></tr>";
  for (let i = 0; i < 24; i++) {
    x += "<tr><td>" + labels[i] + "</td><td>" + data[i] + "</td></tr>";
  }
  x += "</tbody></table>";

  $("#table").append(x);
}