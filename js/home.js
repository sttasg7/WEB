$(document).ready(function() {
    $("#change-pass").hide();
    var entriescount = document.getElementById("entries");
    var lastentry = document.getElementById("last-entry");
    
    $.ajax({
        type: "POST",
        url: "../backend/get-user-stats.php",
        cache: false,          
        success: function(response){ 
          var info = JSON.parse(response);          
          lastentry.innerHTML = "Your last upload was on: " + info.last;
          entriescount.innerHTML = "Number of entries: " + info.count;                            
        }
      })

    }
)


function toggleform() {
  var x = document.getElementById("change-pass");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
} 


/* ΘΕΛΕΙ ΔΟΥΛΕΙΑ ΑΥΤΟ, ΘΑ ΤΟ ΚΑΝΩ ΑΡΓΟΤΕΡΑ

$('#butchange').on('click', function() {
  $("#butchange").attr("disabled", "disabled");
  var username = $('#username').val();
  var email = $('#email').val();
  var password = $('#password').val();
  var newpass = $('#newpassord').val();
  if(username!="" && email!="" && password!="" ){
    $.ajax({
      url: "save.php",
      type: "POST",
      data: {
        type: 3,
        username: username,
        email: email,
        password: password						
      },
      
      cache: false,
      success: function(dataResult){
        var dataResult = JSON.parse(dataResult);
        if(dataResult.statusCode==200){
          $("#butchange").removeAttr("disabled");
          $('#register_form').find('input:text').val('');
          alert("Registration Successful, please Log In"); 	
          $("#register_form").hide();		
          $("#login_form").show();
                            
        }
        else if(dataResult.statusCode==201){
          alert("Email or username already exists!");
        }
        
      }
    });
  }
  else{
    alert('Please fill all the field !');
  }
});

*/