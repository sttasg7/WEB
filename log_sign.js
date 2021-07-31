$(document).ready(function() {

	$("#register_form").hide();
	$("#login_form").hide();
		
	$('#login').on('click', function() {
		$("#login_form").show();
		$("#register_form").hide();
		$("#log_txt").hide();
		$("#sign_txt").hide();
	});
	$('#register').on('click', function() {
		$("#register_form").show();
		$("#login_form").hide();
		$("#log_txt").hide();
		$("#sign_txt").hide();
	});
	
	$('#butsave').on('click', function() {
		$("#butsave").attr("disabled", "disabled");
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
						$("#butsave").removeAttr("disabled");
						$('#register_form').find('input:text').val('');
						alert("Registration Successful, please Log In");
						//$("#success").show();
						//$('#success').html('Registration successful, use the login form to connect!'); 	
						$("#register_form").hide();		
						$("#login_form").show();
															
					}
					else if(dataResult.statusCode==201){
						//$("#error").show();
						//$('#error').html('Email or username already exists !');
						alert("Email or username already exists!");
					}
					
				}
			});
		}
		else{
			alert('Please fill all the field !');
		}
	});
	$('#butlogin').on('click', function() {
		$("#butLogin").attr("disabled", "disabled");
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
			alert('Please fill all the field !');
		}
	});

	 $('#username').focus(function(){
		//$('#error').hide();
		//$('#success').hide();
		$("#butsave").removeAttr("disabled");
	})

	$('#password').focus(function(){
		//$('#error').hide();
		//$('#success').hide();
		$("#butsave").removeAttr("disabled");
	})

	$('#email').focus(function(){
		//$('#error').hide();
		//$('#success').hide();
		$("#butsave").removeAttr("disabled");
	})

	$('#email_log').focus(function(){
		//$('#error').hide();
		//$('#success').hide();
		$("#butLogin").removeAttr("disabled");
	})

	$('#password_log').focus(function(){
		//$('#error').hide();
		//$('#success').hide();
		$("#butLogin").removeAttr("disabled");
	}) 

});