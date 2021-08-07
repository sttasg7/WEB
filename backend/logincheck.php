<?php
include 'database.php';
session_start();


if(isset($_SESSION['username'])) { 

    //user admin or simple user is logged in $loginst = 0
    $loginst = 0;

    //Check if logged user is admin
    $usr=$_SESSION['username'];
    $sql="SELECT admin FROM users WHERE username = '$usr'";
    $result=mysqli_query($conn,$sql);

    if (mysqli_num_rows($result)>0){
        $res = $result->fetch_assoc();
        $res = $res['admin'];
    }else{
        $res = 0;
    }
    //end of check

    //if user is admin $loginst =2
    if($res == 1){
        $loginst = 2;
    }
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
    //no user is logged in $loginst = 1
    $loginst = 1;
    //header("Location: ../index.html");
}
?>