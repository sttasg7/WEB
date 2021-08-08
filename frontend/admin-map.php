<?php
include '../backend/logincheck.php';
?>

<!DOCTYPE html>
<html lang="en">

    <?php if ($loginst == 2){?>

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
    <link href="../css/mine.css" rel="stylesheet">
    <link href="../css/login.css" rel="stylesheet">
    <link rel="icon" href="https://i.imgur.com/qY7kRzP.png" type="img/png">    
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>

    <!--Leaflet stuff-->
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
        integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A=="
        crossorigin="" />

    <!-- Make sure you put this AFTER Leaflet's CSS -->
    <script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"
        integrity="sha512-XQoYMqMTK8LvdxXYG3nZ448hOEQiglfqkJs1NOQV44cWnUrBc8PkAOcXy20w0vlaXaVUearIOBhiXZ5V3ynxwA=="
        crossorigin=""></script>

    <script src="../js/heatmap.js"></script>
    <script src="../js/pwied-heatmap.js"></script>
    <script src="../js/admin-map.js"></script>

</head>
<style>
    .sb-main {
        padding: 2% 2% 8% 2%;
        color: white;
        background-color: rgb(55,55,55);
        font-family: calibri;
        font-size: 123%;
    }
    
    th {
        background: lightgrey;
    },

    td {
        background: white;
    }
    tr:nth-child(even) {
        background-color: white;
    }
</style>
<body>
<!-- Navbar -->
<nav class="navbar navbar-expand-sm bg-dark navbar-dark">
        <div class="container">
        <?php 
        if ($loginst == 1){ ?>
            <a href="../index.html">
                <img src="../pictures/har.png" height="50px" width="auto" alt="HAR Observation & Statistics">
            </a>  
        <?php } else { ?>
            <a href="../frontend/user-profile.php">
                <img src="../pictures/har.png" height="50px" width="auto" alt="HAR Observation & Statistics">
            </a>  
        <?php } ?> 
            
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navmenu">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navmenu">
                <ul class="navbar-nav ms-auto justify-content-end">
                    <li class="nav-item">
                        <a class="nav-link active" href="../frontend/user-profile.php">Home</a>
                    </li>
                    <li lass="nav-item">
                        <a class="nav-link" href="../frontend/user-upload.php">Upload</a>
                    </li>
                    <li lass="nav-item">
                        <a class="nav-link" href="../frontend/user-map.html">Map</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" aria-current="page" href="../frontend/faq.php">FAQs</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="../frontend/about.php">About</a>
                    </li>
                </ul>
            </div>

            <div class="d-grid gap-2 d-md-block d-none d-md-block" style="margin-right: -5%">
                <form action="../backend/logout.php" method="post">
                    <input type="submit" class="btn btn-danger" name="logout" value="Log Out"></input>
                </form>
            </div>
        </div>
    </nav>

<div class="container py-3">
    <div id="mapid"></div>

    <div><img src="https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png" alt="Green"> Users<br>
    <img src="https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-violet.png" alt="Violet"> Servers<br>
     Line weight (thickness) affected by number of connections. <br>
     Click on markers or lines for info.</div>
    <section style="display: flex; flex-direction: row; ">
        
        

        <div id="xanax" style="width:40%; margin-left: 12%;" class="py-4">
        <canvas id="ch1"></canvas>                       
        </div>
        <div id="table" style="width:40%; margin-left: 12%;" class="text-center py-4"></div>

        <div style="width:20%; margin-left:2%">
        <ul id="filt" class="navbar-nav bb"></ul>
        
        </div>

    </section>


</div>

<div class="mb-3 row"></div>
<div class="mb-3 row"></div>
<div class="mb-3 row"></div>
<div class="mb-3 row"></div>
<div class="mb-3 row"></div>
<div class="mb-3 row"></div>
<div class="mb-3 row"></div>
<div class="mb-3 row"></div>
<div class="mb-3 row"></div>
<div class="mb-3 row"></div>
<div class="mb-3 row"></div>
            
<footer class="footer mt-auto py-3 bg-light d-none d-sm-block">
    <div class="container">
        <span class="text-muted text-center">CEID © 2021 Copyright: Παναγιώτης Καπνίσης - Τάσσης Στέφανος</span>
    </div>
</footer>  

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>

<?php } else {?>

    <h1>Access Forbidden</h1>

<?php } ?>
</body>
</html>
