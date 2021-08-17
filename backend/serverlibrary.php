<?php  
include 'database.php';

$sql="SELECT * FROM serverloc WHERE s_lat = '' OR s_lon = ''";
$result=mysqli_query($conn,$sql);

if ($result->num_rows > 0) {
    // output data of each row
    while($row = $result->fetch_assoc()) {      
        $qq = $row["s_ip"];
        $details = json_decode(file_get_contents("https://freegeoip.app/json/$qq"));
        $ip[] = $qq;
        $lat[] = $details->latitude; 
        $lon[] = $details->longitude;         
    }
  
    $c = count($ip);
    for($i=0; $i<$c; $i++) {
        $update = "UPDATE serverloc SET s_lat = '$lat[$i]', s_lon = '$lon[$i]' WHERE s_ip='$ip[$i]'";
        $conn->query($update);
        }     
} 

$conn->close();
?>