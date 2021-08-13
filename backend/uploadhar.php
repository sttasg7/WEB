<?php  
include 'database.php';
session_start();

$data = json_decode($_POST['data']); //pairnoume ola ta har_data pou esteile to user-upload.js
$user = $_SESSION['username'];
$userIP = $_POST['userip'];
$city = $_POST['city'];
$lat = $_POST['lat'];
$long = $_POST['long'];
$isp = $_POST['isp'];
$cnt = 0;
$last = count($data);
$bulk = '';
$srv = '';

foreach($data as $i=>$value) {  //prospelasi kai pros8hkh se ena $bulk string gia na ta valei me ena query
    $cnt++;     

    $bulk .= "('$user',
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
    '$long')";
    //ta teleftaia 5 einai panta idia se ka8e entry
    $srv .= "('$value->serverIPAddress','','')";

    if($cnt<$last) {
        $bulk .= ","; 
        $srv .= ",";    
    }
   }  
   
$sql="INSERT INTO har_data VALUES ".$bulk;
$conn->query($sql);

$sql="INSERT IGNORE INTO serverloc VALUES ".$srv;
$conn->query($sql);

$conn->close();
?>