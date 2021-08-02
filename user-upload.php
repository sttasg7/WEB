<?php 
include 'logincheck.php';
?>


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Upload .har</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
    <link href="mine.css" rel="stylesheet">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
    <link rel="icon" href="https://i.imgur.com/qY7kRzP.png" type="img/png">

</head>
<style>
    
</style>
<body>
    <div class="container-flex">
        <header class="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
          <a href="user-profile.php" class="d-flex align-items-center col-md-3 mb-2 mb-md-0 text-light text-decoration-none">
            <img src=https://i.imgur.com/MtazLc2.png height="50px" width="auto" alt="HAR Observation & Statistics">
          </a>
    
          <ul class="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
            <li><a href="user-profile.php" class="nav-link px-2 link-light">Home</a></li>
            <li><a href="user-upload.php" class="nav-link px-2 link-light link-cur">Upload</a></li>
            <li><a href="user-map.html" class="nav-link px-2 link-light">Map</a></li>
            <li><a href="faq.html" class="nav-link px-2 link-light">FAQs</a></li>
            <li><a href="about.html" class="nav-link px-2 link-light">About</a></li>
          </ul>
    
          <div class="col-md-3 text-end">            
          <form action="logout.php" method="post"> 
              <input type="submit" class="btn btn-danger" name="logout" value="Log Out"></input></form>
          </div>
        </header>
    </div>
    
    <div class="container">
      
        <div class="text-center font-weight-bold fs-25 text-white" id="username"></div>

        <div class="text-center font-weight-bold fs-25 text-white m-t-25" id="total"></div>
        <div class="text-center font-weight-bold fs-25 text-white m-t-25" id="lastdate"></div>


        <p class="text-center  fs-18 text-dark m-t-150">Upload or export your HAR files. <br> Visit <a href="faq.html">FAQ</a> for more info.</p>
        <form id="HarForm" class="text-center  fs-18 text-white m-t-50">
            <input type="file" id="myFile" class="btn btn-upload mx-2" name="filename">
            <input type="button" id="sendtoserver" value="Submit" class="btn btn-dark mx-2" onclick="SendToServer();">
            <input type="button" id="exportslim" value="Export" class="btn btn-info" onclick="Export();">
        </form>
        <br><br>
        <p hidden class="text-center" id="pleasewait">Please wait for the file to process</p>
        <div id="success" class="faq-ans" hidden>Upload successful.</div>


    </div>  
      


      <footer class="footer">
        <div class="container">
            <div class="copyright float-left">
                <p class="mt-5 mb-3 text-muted"> Made by CR7-SKE &copy;2021</p>
            </div>
        </div>
    </footer>


    
        
    


<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
<script src="user-upload.js"></script>
</body>
</html>
