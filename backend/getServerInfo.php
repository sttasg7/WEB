<?php

//$ip = $_POST['ip'];
$ip = "1.2.3.4";
$details = json_decode(file_get_contents("https://freegeoip.app/json/$ip"));
echo $details->latitude; // -> "Mountain View"


?>