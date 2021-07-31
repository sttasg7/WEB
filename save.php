<?php
	include 'database.php';
	session_start();
	if($_POST['type']==1){
		$username=$_POST['username'];
		$email=$_POST['email'];
		$password=$_POST['password'];
		
		$duplicate=mysqli_query($conn,"select * from users where email='$email'");
		if (mysqli_num_rows($duplicate)>0)
		{
			echo json_encode(array("statusCode"=>201));
		}
		else{
			$sql = "INSERT INTO `users`( `username`, `email`, `password`) 
			VALUES ('$username','$email','$password')";
			if (mysqli_query($conn, $sql)) {
				echo json_encode(array("statusCode"=>200));
			} 
			else {
				echo json_encode(array("statusCode"=>201));
			}
		}
		mysqli_close($conn);
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
			echo json_encode(array("statusCode"=>201));
		}
		mysqli_close($conn);
	}
?>