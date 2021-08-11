<?php
	include 'database.php';
	session_start();
	if($_POST['type']==1){
		$username=$_POST['username'];
		$email=$_POST['email'];
		$password=$_POST['password'];
		
		$duplicate=mysqli_query($conn,"select * from users where email='$email'");
		if (mysqli_num_rows($duplicate)>0) {
			echo json_encode(array("statusCode"=>202));
		} else {
			$duplicate=mysqli_query($conn,"select * from users where username='$username'");
			if (mysqli_num_rows($duplicate)>0)
			{
				echo json_encode(array("statusCode"=>203));
			} else {
				$sql = "INSERT INTO `users`( `username`, `email`, `password`) VALUES ('$username','$email','$password')";
				if (mysqli_query($conn, $sql)) {
					echo json_encode(array("statusCode"=>200));
					$_SESSION['email']=$email;
					$_SESSION['username']=$username;
				} else {
					echo json_encode(array("statusCode"=>201));
				}
			}
			mysqli_close($conn);
		}
	}
	if($_POST['type']==2){
		$email=$_POST['email'];
		$password=$_POST['password'];
		$check=mysqli_query($conn,"select * from users where email='$email' and password='$password'");
		if (mysqli_num_rows($check)>0)
		{
			$row = $check->fetch_assoc();
			$_SESSION['email']=$email;
			$_SESSION['username']=$row['username'];
			echo json_encode(array("statusCode"=>200));
		}
		else{
			$check=mysqli_query($conn,"select * from users where email='$email'");
			if (mysqli_num_rows($check)>0){
				echo json_encode(array("statusCode"=>201));
			} else {
				echo json_encode(array("statusCode"=>202));
			}
			
		}
		mysqli_close($conn);
	}

if($_POST['type']==3){
	$skipname = false;
	$skippass = false;
		$username=$_POST['username'];
		if($username === ''){
			$username = $_SESSION['username'];
			$skipname = true;
		}

		$new=$_POST['new'];
		if($new === ''){
			$skippass = true;
		}

		$old=$_POST['old'];
		$ch = $_SESSION['username'];
		$email = $_SESSION['email'];
		$check=mysqli_query($conn, "SELECT * FROM users WHERE email='$email' AND password='$old'");
		if (mysqli_num_rows($check) == 0) {
			echo json_encode(array("statusCode"=>202));
		} else {
			if($skipname === false) {
				$duplicate=mysqli_query($conn,"select * from users where username='$username'");
				if (mysqli_num_rows($duplicate)>0){
					echo json_encode(array("statusCode"=>201));
				} else {
					$sql = "UPDATE users SET username = '$username' WHERE email = '$email'";
					$conn->query($sql); 
					$good = true;
				}
			}
			if($skippass === false) {
				$sql = "UPDATE users SET password = '$new' WHERE email = '$email'";
				if (mysqli_query($conn, $sql)) {
					$good = true;
				} else {
					echo json_encode(array("statusCode"=>203));
				}
			}
			if($good === true) { 
				echo json_encode(array("statusCode"=>200)); 
				$_SESSION['username'] = $username;}
		}
	mysqli_close($conn);
}
?>