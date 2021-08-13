<?php
	include 'database.php';
	session_start();
	if($_POST['type']==1){ //type 1 == register.php
		$username=$_POST['username'];
		$email=$_POST['email'];
		$password=$_POST['password'];
		
		//check if email exists
		$duplicate=mysqli_query($conn,"select * from users where email='$email'");
		if (mysqli_num_rows($duplicate)>0) {
			echo json_encode(array("statusCode"=>202)); //202 -> email taken 
		} else {
			//check if username exists
			$duplicate=mysqli_query($conn,"select * from users where username='$username'");
			if (mysqli_num_rows($duplicate)>0)
			{
				echo json_encode(array("statusCode"=>203)); //203 -> username taken
			} else { //both unique, insert user to database
				$sql = "INSERT INTO `users`( `username`, `email`, `password`) VALUES ('$username','$email','$password')";
				if (mysqli_query($conn, $sql)) {
					echo json_encode(array("statusCode"=>200));
					$_SESSION['email']=$email;
					$_SESSION['username']=$username;
				} else {
					echo json_encode(array("statusCode"=>201)); //sql failed
				}
			}
			mysqli_close($conn);
		}
	}
	if($_POST['type']==2){ //type 2 == login.php
		$email=$_POST['email'];
		$password=$_POST['password'];
		$check=mysqli_query($conn,"select * from users where email='$email' and password='$password'");
		if (mysqli_num_rows($check)>0) //egine match twn kwdikwn, epityxhmeno log-in 
		{
			$row = $check->fetch_assoc();
			$_SESSION['email']=$email;
			$_SESSION['username']=$row['username'];
			echo json_encode(array("statusCode"=>200));
		}
		else{
			$check=mysqli_query($conn,"select * from users where email='$email'"); //check giati den egine to login
			if (mysqli_num_rows($check)>0){
				echo json_encode(array("statusCode"=>201)); //201 -> yparxei to email, ara einai la8os password
			} else {
				echo json_encode(array("statusCode"=>202)); //202 -> den yparxei to email
			}
			
		}
		mysqli_close($conn);
	}

if($_POST['type']==3){ // type 3 == allagi stoixeiwn apo user-profile.php
	$skipname = false;
	$skippass = false;
		$username=$_POST['username'];
		if($username === ''){ //check an 8elei na alla3ei username (to afhse keno 'h oxi)
			$username = $_SESSION['username'];
			$skipname = true;
		}

		$new=$_POST['new'];
		if($new === ''){ //check an 8elei na alla3ei password (to afhse keno 'h oxi)
			$skippass = true;
		}

		$old=$_POST['old'];
		$ch = $_SESSION['username'];
		$email = $_SESSION['email'];
		$check=mysqli_query($conn, "SELECT * FROM users WHERE email='$email' AND password='$old'");
		if (mysqli_num_rows($check) == 0) { //check old password
			echo json_encode(array("statusCode"=>202)); //202 -> wrong old
		} else {
			if($skipname === false) {
				$duplicate=mysqli_query($conn,"select * from users where username='$username'");
				if (mysqli_num_rows($duplicate)>0){
					echo json_encode(array("statusCode"=>201)); //201 -> username taken
				} else { //epityxia
					$sql = "UPDATE users SET username = '$username' WHERE email = '$email'";
					$conn->query($sql); 
					$good = true; 
				}
			}
			if($skippass === false) {
				$sql = "UPDATE users SET password = '$new' WHERE email = '$email'";
				if (mysqli_query($conn, $sql)) {
					$good = true; //epityxia
				} else {
					echo json_encode(array("statusCode"=>203));  
				}
			}
			if($good === true) { 
				echo json_encode(array("statusCode"=>200)); //epityxia se ola
				$_SESSION['username'] = $username;} //8etoume to $_SESSION me to neo username
		}
	mysqli_close($conn);
}
?>