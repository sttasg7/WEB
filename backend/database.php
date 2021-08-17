<?php
	$servername = "localhost";
	$username = "root";
	$password = "";
	$db = "web21";
	/*Create connection*/
	$conn = mysqli_connect($servername, $username, $password,$db);
	if ($conn->connect_error) {
		die("Connection failed: " . $conn->connect_error);
	  }
?>