var passcheck = 0;
var emailcheck = 0;

$(document).ready(function() {
	let numb = /(?=.*\d)/;
	let cap = /(?=.*[A-Z])/;
	let symb = /(?=.*\W.*)/;
	let emailvalid = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/;

	$("#password").on('keyup', function() {
		let x = this.value;
		$("#char8").css("color","red");
		$("#symb").css("color","red");
		$("#numb").css("color","red");
		$("#capl").css("color","red");
		if(x.match(numb)) {
			$("#numb").css("color","green");
		};
		if(x.match(symb)) {
			$("#symb").css("color","green");
		};
		if(x.match(cap)) {
			$("#capl").css("color","green");
		};
		if(x.length > 7) {
			$("#char8").css("color","green");
		};
		if(x.match(numb) && x.match(symb) && x.match(cap) && x.length > 7) {
			$('#butsave').attr("class", "btn btn-success");
			$("#password").attr("class", "form-control border-3 border-success");
			passcheck = 1;
		}
	});

	$("#email").on('keyup', function() {
		$("#email-invalid").attr("hidden","hidden");
		let x = this.value;
		if(x.match(emailvalid)) {
			$("#email").attr("class", "form-control border-3 border-success");
			emailcheck = 1;			
		}
	});

	$("#username").on('keyup', function() {
		$("#user-invalid").attr("hidden","hidden");
		if(this.value != "") {
			$("#username").attr("class", "form-control border-3 border-success");
		} else {
			$("#username").attr("class", "form-control border-3 border-danger");
		}
	});

	$("#email_log").on('keyup', function() {
		$("#email-invalid").attr("hidden","hidden");
		$("#email").attr("class", "form-control");
	});


	$('#butsave').on('click', function() {
		if($('#username').val() == '') {
			$("#username").attr("class", "form-control border-3 border-danger");
			$("#user-invalid").html("Please fill in a username");
			$("#user-invalid").removeAttr("hidden");
		} else {
			var username = $('#username').val();
		}

		var email = $('#email').val();
		if(email.match(emailvalid)) {
			$("#email").attr("class", "form-control border-3 border-success");
			emailcheck = 1;
		} else {
			$("#email").attr("class", "form-control border-3 border-danger");
			$("#email-invalid").html("Please provide a valid email")
			$("#email-invalid").removeAttr("hidden");
			emailcheck = 0;			
		}

		var password = $('#password').val();
		if(passcheck == 0) {
			$("#password").attr("class", "form-control border-3 border-danger");
			//TO SEE
			//$("#password").html("Please provide a valid password")
			//$("#password").removeAttr("hidden");
		} else {
			$("#password").attr("class", "form-control border-3 border-success");
		}
		if(username!="" && email!="" && password!="" && passcheck == 1 && emailcheck == 1){
			$.ajax({
				url: "../backend/save.php",
				type: "POST",
				data: {
					type: 1,
					username: username,
					email: email,
					password: password						
				},
				cache: false,
				success: function(dataResult){
					var dataResult = JSON.parse(dataResult);
					if(dataResult.statusCode==200){
						alert("Registration Successful");
						window.location.href='user-profile.php';								
					}
					else if(dataResult.statusCode==202) {
						$("#email").attr("class", "form-control border-3 border-danger");
						$("#email-invalid").html("Email already exists")
						$("#email-invalid").removeAttr("hidden");
					} else if(dataResult.statusCode==203) {
						$("#username").attr("class", "form-control border-3 border-danger");
						$("#user-invalid").html("Username taken")
						$("#user-invalid").removeAttr("hidden");
					}
					
				}
			});
		} else {
			$('#butsave').attr("class", "btn btn-outline-danger");
		}
	});
	
	$('#butlogin').on('click', function() {
		var email = $('#email_log').val();
		var password = $('#password_log').val();
		if(email == '') {
			$("#email_log").attr("class", "form-control border-3 border-danger");
			$("#email-invalid").html("Please fill field");
			$("#email-invalid").removeAttr("hidden");
		}
		if(password == '') {
			$("#password_log").attr("class", "form-control border-3 border-danger");
			$("#pass-invalid").html("Please fill field");
			$("#pass-invalid").removeAttr("hidden");
		}

		if(email!="" && password!="" ){
			$("#email_log").attr("class", "form-control");
			$("#password_log").attr("class", "form-control");
			$("#user-invalid").attr("hidden","hidden");
			$("#pass-invalid").attr("hidden","hidden");
			$.ajax({
				url: "../backend/save.php",
				type: "POST",
				data: {
					type:2,
					email: email,
					password: password						
				},
				
				cache: false,
				success: function(dataResult){
					var dataResult = JSON.parse(dataResult);
					if(dataResult.statusCode==200){
						location.href = "user-profile.php";						
					}
					else if(dataResult.statusCode==201){
						$("#password_log").attr("class", "form-control border-3 border-danger");
						$("#pass-invalid").removeAttr("hidden");
						$("#pass-invalid").html("Password invalid");
					}
					else if(dataResult.statusCode==202){
						$("#email_log").attr("class", "form-control border-3 border-danger");
						$("#email-invalid").removeAttr("hidden");
						$("#email-invalid").html("Email not found");
					}
				}
			});
		}		
	});

	$('#signupref').on('click', function() {
		location.href = "register.html";
	});

});