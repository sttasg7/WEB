let numb = /(?=.*\d)/;
let cap = /(?=.*[A-Z])/;
let symb = /(?=.*\W.*)/;
let emailvalid = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/;

$(document).ready(function () {
  $("#change-pass").hide();
  var entriescount = document.getElementById("entries");
  var lastentry = document.getElementById("last-entry");

  $.ajax({
    type: "POST",
    url: "../backend/get-user-stats.php",
    cache: false,
    success: function (response) {
      var info = JSON.parse(response);
      lastentry.innerHTML = "Your last upload was on: <b>" + info.last + "</b>";
      entriescount.innerHTML = "Number of entries: <b>" + info.count + "</b>";
    }
  })

  $('#b1').on('click', function () {
    let x = document.getElementById("hidb1");
    if (x.hidden) {
      x.removeAttribute("hidden");
    } else {
      $("#hidb1").attr("hidden", "hidden");
    }
  });



  $('#butsave').on('click', function () {
    var username = $('#username').val();
    var newpass = $('#newpass').val();
    var oldpass = $('#oldpass').val();
    if(crit(newpass)){
      $.ajax({
        url: "../backend/save.php",
        type: "POST",
        data: {
          type: 3,
          username: username,
          new: newpass,
          old: oldpass
        },
        cache: false,
        success: function (dataResult) {
          var dataResult = JSON.parse(dataResult);
          if (dataResult.statusCode == 200) {
            alert("Changes Successful");
            window.location.href = 'user-profile.php';
          } else if (dataResult.statusCode == 201) {
            alert("Username Taken, Choose Something Else!");
            $('#username').attr("class", "form-control border border-danger");
          } else if (dataResult.statusCode == 202) {
            alert("Old Password Wrong!");
            $('#oldpass').attr("class", "form-control border border-danger");
          } else if (dataResult.statusCode == 203) {
            alert("Failed. Please Try Again!");
          }  
        }
      });
    } else {
      alert("Please match the required password criteria")
    }
    
  });


  $('#newpass').on('keyup', function () {
    let x = this.value;
    $('#butsave').attr("class", "btn btn-danger");
    $("#password").attr("class", "form-control border-3 border-danger");
    $("#char8").css("color", "red");
    $("#symb").css("color", "red");
    $("#numb").css("color", "red");
    $("#capl").css("color", "red");
    if (x.match(numb)) {
      $("#numb").css("color", "green");
    };
    if (x.match(symb)) {
      $("#symb").css("color", "green");
    };
    if (x.match(cap)) {
      $("#capl").css("color", "green");
    };
    if (x.length > 7) {
      $("#char8").css("color", "green");
    };
    if (crit(x)) {
      $('#butsave').attr("class", "btn btn-success");
      $("#password").attr("class", "form-control border-3 border-success");
    }

  })



})


function crit(x) {
  if (x.match(numb) && x.match(symb) && x.match(cap) && x.length > 7) {
    return true;
  } else {
    return false;
  }
}

function toggleform() {
  var x = document.getElementById("change-pass");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}