<?php
include 'database.php';
session_start();


//Register
if ($_POST['type'] == 1) {
	$username = $_POST['username'];
	$email = $_POST['email'];
	$password = $_POST['password'];

	$duplicate = mysqli_query($conn, "select * from users where email='$email'");
	if (mysqli_num_rows($duplicate) > 0) {
		echo json_encode(array("statusCode" => 202));
	} else {
		$duplicate = mysqli_query($conn, "select * from users where username='$username'");
		if (mysqli_num_rows($duplicate) > 0) {
			echo json_encode(array("statusCode" => 203));
		} else {
			$sql = "INSERT INTO `users`( `username`, `email`, `password`) VALUES ('$username','$email','$password')";
			if (mysqli_query($conn, $sql)) {
				echo json_encode(array("statusCode" => 200));
				$_SESSION['email'] = $email;
				$_SESSION['username'] = $username;
			} else {
				echo json_encode(array("statusCode" => 201));
			}
		}
		mysqli_close($conn);
	}
}

//Login
if ($_POST['type'] == 2) {
	$email = $_POST['email'];
	$password = $_POST['password'];
	$check = mysqli_query($conn, "select * from users where email='$email' and password='$password'");
	if (mysqli_num_rows($check) > 0) {
		$row = $check->fetch_assoc();
		$_SESSION['email'] = $email;
		$_SESSION['username'] = $row['username'];
		echo json_encode(array("statusCode" => 200));
	} else {
		$check = mysqli_query($conn, "select * from users where email='$email'");
		if (mysqli_num_rows($check) > 0) {
			echo json_encode(array("statusCode" => 201));
		} else {
			echo json_encode(array("statusCode" => 202));
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

	if (mysqli_num_rows($check) == 0) {
		$code = 202; //old-pass wrong
		$good = 0;
	} else {
		if ($skipname === false) {
			$duplicate = mysqli_query($conn, "select * from users where username='$username'");
			if (mysqli_num_rows($duplicate) > 0) {
				$code = 201; //username taken
				$good = 0;
			}
		}
	}

	if ($good == 1) {
		if ($skippass === false) {
			$sql = "UPDATE users SET username = '$username', password = '$new' WHERE email = '$email'";
		} else {
			$sql = "UPDATE users SET username = '$username' WHERE email = '$email'";
		}
		if (mysqli_query($conn, $sql)) {
			$_SESSION['username'] = $username;
			$code = 200;
		} else {
			$code = 203;
		}
	}

	mysqli_close($conn);
	echo json_encode(array("statusCode" => $code));
}
