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
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
    <link href="../css/mine.css" rel="stylesheet">
    <link href="../css/login.css" rel="stylesheet">
    <link rel="icon" href="../pictures/favicon.png" type="img/png">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>

    <!--Leaflet stuff-->
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
        integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A=="
        crossorigin="" />

    <!-- Make sure you put this AFTER Leaflet's CSS -->
    <script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"
        integrity="sha512-XQoYMqMTK8LvdxXYG3nZ448hOEQiglfqkJs1NOQV44cWnUrBc8PkAOcXy20w0vlaXaVUearIOBhiXZ5V3ynxwA=="
        crossorigin=""></script>

        <script src="../js/admin-map.js"></script>
    <!--
        <script src="../js/heatmap.js"></script>
    <script src="../js/pwied-heatmap.js"></script>
    
    -->

</head>
<style>
  /*  
.sb-main {
    padding: 2% 2% 8% 2%;
    color: white;
    background-color: rgb(55, 55, 55);
    font-family: calibri;
    font-size: 123%;
}

th {
    background: lightgrey;
}

td {
    background: white;
}

tr:nth-child(even) {
    background-color: white;
}
*/
body {
    background-image: url('../pictures/blu.jpg');
    /*background-image: url('../pictures/abstr.png');*/
    background-size: cover;
    }
</style>

<body>
    <!-- Navbar -->
    <nav class="navbar navbar-expand-sm bg-dark navbar-dark">
        <div class="container">
            <?php 
        if ($loginst == 1){ ?>
            <a href="../index.php">
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
                        <a class="nav-link" href="../frontend/user-profile.php">Home</a>
                    </li>
                    <li lass="nav-item">
                        <a class="nav-link" href="../frontend/user-upload.php">Upload</a>
                    </li>
                    <li lass="nav-item">
                        <a class="nav-link" href="../frontend/user-map.php">Map</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" aria-current="page" href="../frontend/faq.php">FAQs</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="../frontend/about.php">About</a>
                    </li>
                    <?php if ($loginst == 2){ ?>
                    <li class="nav-item link-cur" style="margin-left: 2%;">
                        <div class="dropdown">
                            <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton2"
                                data-bs-toggle="dropdown" aria-expanded="false">Admin Tools</button>
                            <ul class="dropdown-menu dropdown-menu-dark" aria-labelledby="dropdownMenuButton2">
                                <li><a class="dropdown-item" href="admin.php">Basic Stats</a></li>
                                <li><a class="dropdown-item" href="admin-analysis.php">Timings Analysis</a></li>
                                <li><a class="dropdown-item" href="admin-headers.php">Headers Analysis</a></li>
                                <li><a class="dropdown-item" href="admin-map.php">Connections Map</a></li>
                            </ul>
                        </div>
                    </li>
                    <?php } ?>
                    <li class="nav-item px-1">
                        <form action="../backend/logout.php" method="post"><input type="submit" class="btn btn-danger"
                                name="logout" value="Log Out"></input>
                        </form>
                    </li>
                </ul>
            </div>
        </div>
    </nav>

    <div class="container py-5" style="margin-bottom: 40px;">
        <div id="mapid" style="border-radius: 15px; opacity: 0.95;"></div>

        <div class="py-3"><img src="https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png"
                alt="Green"> Users<br>
            <img src="https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-violet.png"
                alt="Violet" class="py-3"> Servers<hr>
                <div class="fs-4">
                    <div id="admfooter"><p class="fw-light" style="margin-left: 2%;">Line weight (thickness) affected by number of connections.</p></div> <hr>
                    <div id="admfooter"><p class="fw-light" style="margin-left: 2%;">Line opacity affected by number of servers on the same location.</p></div> <hr>
                    <div id="admfootersec"><p class="fw-light" style="margin-left: 2%;">Click on markers or lines for info.</p></div>
                </div>
        </div>
    </div>

    
    

    <footer class="footer mt-auto py-3 bg-dark">
        <div class="container">
            <span class="text-muted text-center">CEID © 2021 Copyright: Παναγιώτης Καπνίσης - Τάσσης Στέφανος - Ιωάννης Αγγελόπουλος</span>
        </div>
    </footer>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous">
    </script>

    <?php } else {?>

    <h1>Access Forbidden</h1>

    <?php } ?>
</body>

</html>