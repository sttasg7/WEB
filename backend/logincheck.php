<?php
session_start();

if(isset($_SESSION['username'])) { 
    $loginst = 0;
    /*
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
    $loginst = 1;
    //header("Location: ../index.html");
}
?>