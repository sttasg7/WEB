$(document).ready(function() { 
var data;
    $.ajax({
        type: "POST",
        url: "../backend/get-admin.php",
        data: {
            type: 1
        },
        cache: false,          
        success: function(response){           
          console.log(response);
          showData(response);                
        }
      });

});

function showData(r) {
    
    var f = JSON.parse(r);

    
    var labels = f.methods.map(function(e) {
        return e.name;
     });
     var data = f.methods.map(function(e) {
        return e.count;
     });

     console.log(labels.length);

    
    let myChart = document.getElementById('ch1').getContext('2d');
    let massPopChart = new Chart(myChart, {
            type: 'bar',
            data: {
                labels: labels,
                datasets:[{
                    label: 'entries',
                    data: data,
                    borderWidth: 2,
                    borderColor: '#111',
                    backgroundColor: palette('tol', data.length).map(function(hex) {
                        return '#' + hex;
                      })
                }]
            },
            options: {
                legend: {
                    "display": true
                  },
                  tooltips: {
                    "enabled": true
                  },
                indexAxis: 'y'
            }
        })

///

        var labels2 = f.status.map(function(e) {
            return e.name;
         });
         var data2 = f.status.map(function(e) {
            return e.count;
         });
    
         console.log(labels.length);
    
    
   
        let vv = document.getElementById('ch2').getContext('2d');
        let aa = new Chart(vv, {
                type: 'bar',
                data: {
                    labels: labels2,
                    datasets:[{
                        data: data2,
                        borderWidth: 2,
                        borderColor: '#111',
                        backgroundColor: palette('tol', data.length).map(function(hex) {
                            return '#' + hex;
                          })
                    }]
                },
                options: {
                    legend: {
                        "display": true
                      },
                      tooltips: {
                        "enabled": true
                      },
                    indexAxis: 'y'
                }
            })
    
};


//function updateChart() {
  //  const filterData = myChart.data.datasets[0].data.filterData(value => )
//}