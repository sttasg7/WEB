<?php 
include '../backend/logincheck.php';
?>


<!DOCTYPE html>
<html lang="en">

<?php if ($loginst != 1){?>

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Upload .har</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
    <link href="../css/mine.css" rel="stylesheet">
    <link href="../css/login.css" rel="stylesheet">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <link rel="icon" href="../pictures/favicon.png" type="img/png">

</head>
<style>
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
                        <a class="nav-link" href="../frontend/user-profile.php">Home</a>
                    </li>
                    <li lass="nav-item">
                        <a class="nav-link active" href="../frontend/user-upload.php">Upload</a>
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

    <div class="container">

        <div class="text-center font-weight-bold fs-25 text-white" id="username"></div>

        <div class="text-center font-weight-bold fs-25 text-white m-t-25" id="total"></div>
        <div class="text-center font-weight-bold fs-25 text-white m-t-25" id="lastdate"></div>


        <p class="text-center lead fs-18 text-dark m-t-150">Upload or export your HAR files. <br> Visit <a
                href="faq.php">FAQ</a> for more info.</p>
        <form id="HarForm" class="text-center  fs-18 text-white m-t-50">
            <input type="file" id="myFile" class="btn btn-upload mx-2" name="filename">
            <input type="button" id="sendtoserver" value="Submit" class="btn btn-dark mx-2" onclick="SendToServer();">
            <input type="button" id="exportslim" value="Export" class="btn btn-info" onclick="Export();">
        </form>
        <br><br>
        <p hidden class="faq-ans text-center" id="pleasewait">Please wait for the file to process</p>
        <div id="success" class="faq-ans" hidden>Upload successful.</div>

    </div>

    <div class="mb-3 row"></div>
    <div class="mb-3 row"></div>
    <div class="mb-3 row"></div>
    

    <img src="../pictures/har-dark.png" height="150px" width="auto" alt="HAR Observation & Statistics" style="display: block; margin-left: auto;  margin-right: auto;">

    <div class="mb-3 row"></div>
    <div class="mb-3 row"></div>
    <div class="mb-3 row"></div>
    <div class="mb-3 row"></div>
    <div class="mb-2 row"></div>

    <footer class="footer mt-auto py-3 bg-dark d-none d-sm-block">
        <div class="container">
            <span class="text-muted text-center">CEID © 2021 Copyright: Παναγιώτης Καπνίσης - Τάσσης Στέφανος</span>
        </div>
    </footer>







    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous">
    </script>
    <script src="../js/user-upload.js"></script>

    <?php } else {?>

        <h1>Access Forbidden</h1>

    <?php } ?>

</body>

</html>