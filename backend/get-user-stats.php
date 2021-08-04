<?php  
include 'database.php';
session_start();

$user = $_SESSION['username'];

$sql="SELECT COUNT(*) AS total FROM har_data WHERE username_user = '$user'";
$result=mysqli_query($conn,$sql);
while($data=mysqli_fetch_array($result)){ 
    $count = $data['total']; 
}

$sql="SELECT MAX(date) AS maxdate FROM har_data WHERE username_user = '$user'";
$result=mysqli_query($conn,$sql);
while($data=mysqli_fetch_array($result)){ 
    $last = $data['maxdate']; 
}
echo json_encode(array("count"=>$count, "last"=>$last));
$conn->close();

?>