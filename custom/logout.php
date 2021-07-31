<?php
session_start();

if($_SERVER['REQUEST_METHOD'] == "POST" and isset($_POST['logout'])) {
unset($_SESSION["email"]);
unset($_SESSION["password"]);
session_destroy(); // Deletes user session completely --- Re-login is necessary
header("Location: loginscreen.html");
}
?>