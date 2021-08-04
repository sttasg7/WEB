<?php
session_start();

if(isset($_SESSION['username'])) { /*
    if($_SESSION['username'] != "admin") {
        $curPageName = substr($_SERVER["SCRIPT_NAME"],strrpos($_SERVER["SCRIPT_NAME"],"/")+1);
        if(str_contains(string $curPageName, string "admin")) {
            echo "not allowed";
            header("Location: user-profile.php");
        }
    } */
    // CHECK TO STOP USERS FROM ADMIN PAGES 
}
else {
    header("Location: ./index.html");
}
?>