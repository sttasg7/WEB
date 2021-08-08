<?php
session_start();
include 'database.php';

$user = $_SESSION['username'];

$sql="SELECT serveripaddress AS ip, COUNT(serveripaddress) AS total FROM har_data WHERE username_user = '$user' GROUP BY serveripaddress ORDER BY serveripaddress";
$result=mysqli_query($conn,$sql);
$s = array();

while($data=mysqli_fetch_array($result)){  
    $s[] =  array('ip' => $data['ip'], 'count' => $data['total']);    
}

$s = json_encode($s);

$search = '';
$cnt = 0;
$pp = 0;

$s = json_decode($s); //don't even ask why

foreach($s as $i=>$value) {
    $cnt++;
    $search .= "s_ip = '$value->ip'";    
    if($cnt<count($s)) {
            $search .= " OR "; 
        }
    }      
    $sql="SELECT s_ip as ip, s_lat as lat, s_lon as lon FROM serverloc WHERE ".$search;
    $result=mysqli_query($conn,$sql);
    $rows = array();

    while($r = mysqli_fetch_assoc($result)) {        
        $rows[] = array('ip' => $r['ip'], 'count' => $s[$pp]->count, 'lat' => $r['lat'], 'lng' => $r['lon']);
        $pp++;
    }

$conn->close();

echo json_encode($rows);
//echo json_encode($s);
?>