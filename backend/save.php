<?php
include 'database.php';
session_start();


//Register
if ($_POST['type'] == 1) {
	$username = $_POST['username'];
	$email = $_POST['email'];
	$password = $_POST['password'];

	$duplicate = mysqli_query($conn, "select * from users where email='$email'"); //check if email exists
	if (mysqli_num_rows($duplicate) > 0) {
		echo json_encode(array("statusCode" => 202)); //duplicate email
	} else {
		$duplicate = mysqli_query($conn, "select * from users where username='$username'");
		if (mysqli_num_rows($duplicate) > 0) {
			echo json_encode(array("statusCode" => 203)); //duplicate username
		} else {
			$sql = "INSERT INTO `users`( `username`, `email`, `password`) VALUES ('$username','$email','$password')";
			if (mysqli_query($conn, $sql)) {
				echo json_encode(array("statusCode" => 200)); //success
				$_SESSION['email'] = $email;
				$_SESSION['username'] = $username;
			} else {
				echo json_encode(array("statusCode" => 201)); //sql fail
			}
		}
		mysqli_close($conn);
	}
}

//Login
if ($_POST['type'] == 2) {
	$email = $_POST['email'];
	$password = $_POST['password'];
	$check = mysqli_query($conn, "select * from users where email='$email' and password='$password'"); //check if email+pass combo matches
	if (mysqli_num_rows($check) > 0) {
		$row = $check->fetch_assoc();
		$_SESSION['email'] = $email; //log in user in SESSION
		$_SESSION['username'] = $row['username'];
		echo json_encode(array("statusCode" => 200)); //success
	} else {
		$check = mysqli_query($conn, "select * from users where email='$email'"); //check what failed
		if (mysqli_num_rows($check) > 0) {
			echo json_encode(array("statusCode" => 201)); //email not found
		} else {
			echo json_encode(array("statusCode" => 202)); //password wrong
		}
	}
	mysqli_close($conn);
}


//Home page
if ($_POST['type'] == 3) {
	$skipname = false;
	$skippass = false;
	$good = 1;
	$username = $_POST['username'];
	if ($username === '') {
		$username = $_SESSION['username'];
		$skipname = true;
	}

	$new = $_POST['new'];
	if ($new === '') {
		$skippass = true;
	}

	$old = $_POST['old'];
	$ch = $_SESSION['username'];
	$email = $_SESSION['email'];
	$check = mysqli_query($conn, "SELECT * FROM users WHERE email='$email' AND password='$old'");

	if (mysqli_num_rows($check) == 0) { //check old password 
		$code = 202; //old-pass wrong
		$good = 0;
	} else {
		if ($skipname === false) { //check username availability
			$duplicate = mysqli_query($conn, "select * from users where username='$username'");
			if (mysqli_num_rows($duplicate) > 0) {
				$code = 201; //username taken
				$good = 0;
			}
		}
	}

	if ($good == 1) { //if all is correct proceed with changes
		if ($skippass === false) {
			$sql = "UPDATE users SET username = '$username', password = '$new' WHERE email = '$email'";
		} else {
			$sql = "UPDATE users SET username = '$username' WHERE email = '$email'";
		}
		if (mysqli_query($conn, $sql)) {
			$_SESSION['username'] = $username; //change username in SESSION global
			$code = 200; //success
		} else {
			$code = 203; 
		}
	}

	mysqli_close($conn);
	echo json_encode(array("statusCode" => $code));
}
