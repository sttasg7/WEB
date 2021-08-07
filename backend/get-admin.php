<?php
session_start();
include 'database.php';

$type = 1; //$_POST['type'];

//Admin question 1
if($type == 1) {
    $s = array();

    //user count
    $sql="SELECT COUNT(username) AS cnt FROM users";
    $result=mysqli_query($conn,$sql);
    
    while($data=mysqli_fetch_array($result)){  
        $s['counts'][] =  array('users' => $data['cnt']);    
    }
    

    //method count
    $sql="SELECT method AS method, COUNT(method) AS cnt FROM har_data GROUP BY method ORDER BY method";
    $result=mysqli_query($conn,$sql);

    while($data=mysqli_fetch_array($result)){  
        $s['methods'][] =  array('name' => $data['method'], 'count' => $data['cnt']);    
    }


    //status count
    $sql="SELECT status AS status, COUNT(status) AS cnt FROM har_data GROUP BY status ORDER BY status";
    $result=mysqli_query($conn,$sql);
    
    while($data=mysqli_fetch_array($result)){  
        $s['status'][] =  array('name' => $data['status'], 'count' => $data['cnt']);    
    }


    //domains isp   
    $sql="SELECT COUNT(DISTINCT domain) AS cnt, COUNT(DISTINCT isp) AS isp FROM har_data";
    $result=mysqli_query($conn,$sql);

    while($data=mysqli_fetch_array($result)){  
        $s['counts'][] =  array('domains' => $data['cnt'], 'ISP' => $data['isp']);    
    }


    //average age
    $sql="SELECT content_type AS type, AVG(age) AS age FROM har_data GROUP BY content_type ORDER BY content_type";
    $result=mysqli_query($conn,$sql);

    while($data=mysqli_fetch_array($result)){  
       // $age = (int) $data['age'];
        $round = round($data['age'],2);
        $s['ages'][] =  array('content' => $data['type'], 'avg' => $round);    
    }

    
    //push eveything in one json
    $s = json_encode($s);
    echo $s;
}


//Admin question 2
if($type == 2) {

    $sql="SELECT content_type AS ct, wait AS wait, starteddatetime AS dt, method as md, isp as isp FROM har_data";
    $result=mysqli_query($conn,$sql);
    $s = array();

    while($data=mysqli_fetch_array($result)){      
        $s[] =  array('content' => $data['ct'], 'wait' => $data['wait'], 'date' => $data['dt'], 'method' => $data['md'], 'isp' => $data['isp']);    
    }

    //push eveything in one json
    $s = json_encode($s);
    echo $s;
}


//Admin question 3
if($type == 3) {

    $sql="SELECT content_type AS ct, cache_control AS cache, expires AS expires, starteddatetime AS dt, isp AS isp FROM har_data";
    $result=mysqli_query($conn,$sql);
    $s = array();

    while($data=mysqli_fetch_array($result)){  
        $s[] =  array('content' => $data['ct'], 'date' => $data['dt'], 'cache' => $data['cache'], 'isp' => $data['isp']);    
    }

    //push eveything in one json
    $s = json_encode($s);
    echo $s;
}


//Admin question 4
if($type == 4) {

    $sql="SELECT serveripaddress AS sip, COUNT(serveripaddress) AS cnt, userip AS uip FROM har_data GROUP BY serveripaddress";
    $result=mysqli_query($conn,$sql);
    $s = array();

    while($data=mysqli_fetch_array($result)){  
        $s[] =  array('user' => $data['uip'], 'server' => $data['sip'], 'count' => $data['cnt']);    
    }

    //push eveything in one json
    $s = json_encode($s);
    echo $s;
}

?>