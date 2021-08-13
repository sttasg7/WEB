var passcheck = 0;
var emailcheck = 0;

$(document).ready(function() {
	let numb = /(?=.*\d)/;
	let cap = /(?=.*[A-Z])/;
	let symb = /(?=.*\W.*)/;
	let emailvalid = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/;

	$("#password").on('keyup', function() { //se ka8e koumpi tsekarei olo to password
		let x = this.value;
		$("#char8").css("color","red"); //kanoume ola ta requirements kokkina
		$("#symb").css("color","red");
		$("#numb").css("color","red");
		$("#capl").css("color","red");
		if(x.match(numb)) {
			$("#numb").css("color","green"); //wste molis vre8ei ena match na prasinisei to antistoixo
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
		if(x.match(numb) && x.match(symb) && x.match(cap) && x.length > 7) { //an kanoun match ola ta criteria, prasinizei to koumpi kai to input
			$('#butsave').attr("class", "btn btn-success");
			$("#password").attr("class", "form-control border-3 border-success");
			passcheck = 1;
		}
	});

	$("#email").on('keyup', function() { //omoiws me gr.10
		$("#email-invalid").attr("hidden","hidden"); //gia na svhsei error apo prohgoumenh prospa8eia
		let x = this.value;
		if(x.match(emailvalid)) {
			$("#email").attr("class", "form-control border-3 border-success");
			emailcheck = 1;			
		}
	});

	$("#username").on('keyup', function() { //omoiws pali me gr.10
		$("#user-invalid").attr("hidden","hidden");
		if(this.value != "") {
			$("#username").attr("class", "form-control border-3 border-success");
		} else {
			$("#username").attr("class", "form-control border-3 border-danger");
		}
	});

	$("#email_log").on('keyup', function() { //gia na kryvoume to error otan 3anavazei email meta apo lathos
		$("#email-invalid").attr("hidden","hidden");
		$("#email").attr("class", "form-control");
	});


	$('#butsave').on('click', function() {
		if($('#username').val() == '') { //check gia keno username field
			$("#username").attr("class", "form-control border-3 border-danger");
			$("#user-invalid").html("Please fill field");
			$("#user-invalid").removeAttr("hidden");
		} else {
			var username = $('#username').val();
		}

		var email = $('#email').val();
		if(email.match(emailvalid)) { //check gia valid email 
			$("#email").attr("class", "form-control border-3 border-success");
			emailcheck = 1; 
		} else {
			$("#email").attr("class", "form-control border-3 border-danger");
			$("#email-invalid").html("Please provide a valid email")
			$("#email-invalid").removeAttr("hidden");
			emailcheck = 0;			
		}

		var password = $('#password').val();
		if(passcheck == 0) { //check an to password exei ola ta criteria
			$("#password").attr("class", "form-control border-3 border-danger");
		} else {
			$("#password").attr("class", "form-control border-3 border-success");
		}
		if(username!="" && email!="" && password!="" && passcheck == 1 && emailcheck == 1){ //an einai ola komple, tote epikoinwnia me db
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
						window.location.href='user-profile.php'; //auto to alla3a, se epityxhmeno register na ton paei katey8eian logged-in sthn Home								
					}
					else if(dataResult.statusCode==202) { //analoga ta codes (des save.php)
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
		if(email == '') { //check gia keno
			$("#email_log").attr("class", "form-control border-3 border-danger");
			$("#email-invalid").html("Please fill field");
			$("#email-invalid").removeAttr("hidden");
		}
		if(password == '') { //check keno
			$("#password_log").attr("class", "form-control border-3 border-danger");
			$("#pass-invalid").html("Please fill field");
			$("#pass-invalid").removeAttr("hidden");
		}

		if(email!="" && password!="" ){ //an ola komple, tote mila me db
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
					else if(dataResult.statusCode==201){ //des status codes apo save.php
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