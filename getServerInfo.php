<?php

class Info {
    public $s_ip;
    public $s_lat;
    public $s_lon;
}

function getServerLocation($server) {
    $forserver = "https://freegeoip.app/json/" . $server;

    $curl = curl_init();

    curl_setopt_array($curl, array(
    CURLOPT_URL => $forserver,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_ENCODING => "",
    CURLOPT_MAXREDIRS => 10,
    CURLOPT_TIMEOUT => 30,
    CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
    CURLOPT_CUSTOMREQUEST => "GET",
    CURLOPT_HTTPHEADER => array(
        "accept: application/json",
        "content-type: application/json"
    ),
    ));

    $response = curl_exec($curl);
    $err = curl_error($curl);

    curl_close($curl);

    $ret = new Info();

    if ($err) {} 
    else {
        $s = json_decode($response);
        foreach($s as $i=>$value) {
            $ret->s_ip = $value->ip;
            $ret->s_lat = $value->latitude;
            $ret->s_lon = $value->longitude;
            }
    }
return $ret;
}
?>