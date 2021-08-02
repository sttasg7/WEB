<?php  
include 'database.php';
session_start();

$data = json_decode($_POST['data']);
$user = $_SESSION['username'];
$userIP = $_POST['userip'];
$city = $_POST['city'];
$lat = $_POST['lat'];
$long = $_POST['long'];
$isp = $_POST['isp'];
$cnt = 0;
//$provider = gethostbyaddr($_SERVER['REMOTE_ADDR']);

foreach($data as $i=>$value) {   
    $cnt++;     
    $sql="INSERT INTO har_data 
        VALUES ('$user',
                '$value->startedDateTime',
                '$value->serverIPAddress',
                '$value->wait',
                '$value->method',
                '$value->url',
                '$value->status',
                '$value->statusText',
                '$value->Content_Type',
                '$value->Cache_Control',
                '$value->Pragma',
                '$value->Expires',
                '$value->Age',
                '$value->Last_Modified',
                '$value->Host',
                default,
                '$userIP',
                '$isp',
                '$city',
                '$lat',
                '$long'
                )";
    $conn->query($sql);    
}

$conn->close();

?>