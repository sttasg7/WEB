<?php
session_start();

if($_SERVER['REQUEST_METHOD'] == "POST" and isset($_POST['logout'])) {
unset($_SESSION["email"]);
unset($_SESSION["password"]);
header("Location: login.html");
}
?>