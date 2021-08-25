<?php  
include 'database.php';

//update server library so every server has defined lat long
$sql="SELECT * FROM serverloc WHERE s_lat = '' OR s_lon = '' OR (s_lat = 0 AND s_lon = 0)";
$result=mysqli_query($conn,$sql);

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {      
        $qq = $row["s_ip"];
        $details = json_decode(file_get_contents("https://freegeoip.app/json/$qq"));
        if($details->latitude == 0 || $details->longitude == 0) { //if freegoip fails -> use ip-api
            $alt = json_decode(file_get_contents("http://ip-api.com/json/$qq?access_key=016a0c242c43d314277f5a2acda438ee&output=json"));
            if($alt) {
                $ip[] = $qq;
                $lat[] = $alt->lat; 
                $lon[] = $alt->lon;  
            } else { //if all options fail -> set to Amazon cloud main server
                $ip[] = $qq;
                $lat[] = 37.751;
                $lon[] = -97.822;
            }

        } else {
            $ip[] = $qq;
            $lat[] = $details->latitude;
            $lon[] = $details->longitude;
        }
               
    }
  
    $c = count($ip);
    for($i=0; $i<$c; $i++) {
        $update = "UPDATE serverloc SET s_lat = '$lat[$i]', s_lon = '$lon[$i]' WHERE s_ip='$ip[$i]'";
        $conn->query($update);
        }     
} 

$conn->close();

?>