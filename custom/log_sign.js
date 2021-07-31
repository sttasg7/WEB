$(document).ready(function() {
	
	$('#butsave').on('click', function() {
		var username = $('#username').val();
		var email = $('#email').val();
		var password = $('#password').val();
		if(username!="" && email!="" && password!="" ){
			$.ajax({
				url: "save.php",
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
						$('#register_form').find('input:text').val('');
						alert("Registration Successful, Please Log In");
						//$("#success").show();
						//$('#success').html('Registration successful, use the login form to connect!'); 	
						//location.href = "loginscreen.html";	
						window.location.href='loginscreen.html';								
					}
					else if(dataResult.statusCode==201){
						//$("#error").show();
						//$('#error').html('Email or username already exists !');
						alert("Email or Username Already Exists!");
					}
					
				}
			});
		}
		else{
			alert('Please fill in all the fields!');
		}
	});
	$('#butlogin').on('click', function() {
		var email = $('#email_log').val();
		var password = $('#password_log').val();
		if(email!="" && password!="" ){
			$.ajax({
				url: "save.php",
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
						//$("#error").show();
						//$('#error').html('Invalid Email or Password !');
						alert("Your inputs are not valid!");
					}
					
				}
			});
		}
		else{
			alert('Please fill all the fields!');
		}
	});

	$('#butsignup').on('click', function() {
		location.href = "register.html";
	});

	$('#navlogin').on('click', function() {
		location.href = "loginscreen.html";
	});

	$('#signupref').on('click', function() {
		location.href = "register.html";
	});

});