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
    <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.5.0/chart.min.js"></script>
    <script src="../js/palette.js"></script>
    <script src="../js/admin.js"></script>

</head>
<style>
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
    
    <div class="container d-flex" style="margin-bottom: 70px;">
        <div class="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark" style="height: 100%;">
            <hr>
            <b><a href="admin.php" class="d-flex text-white text-center  text-decoration-none">Basic
                    Info</a></b>
            <hr>
            <ul class="nav nav-pills flex-column mb-auto">
                <li class="sb-main d-flex bd-highlight bg-dark">
                    <div class="p-1 flex-grow-1 bd-highlight">Basic Stats</div>
                    <input type="button" name="save" class="btn-sm btn-outline-secondary p-1 bd-highlight" value="Show" id="basics">
                </li>
                <li class="sb-main d-flex bd-highlight bg-dark">
                    <div class="p-1 flex-grow-1 bd-highlight">Methods</div>
                    <input type="button" name="save" class="btn-sm btn-outline-secondary p-1 bd-highlight" value="Table"
                        id="methodstable">
                    <input type="button" name="save" class="btn-sm btn-outline-info p-1 bd-highlight" value="Graph"
                        id="methods">
                </li>
                <li class="sb-main d-flex bd-highlight bg-dark">
                    <div class="p-1 flex-grow-1 bd-highlight">Response Codes</div>
                    <input type="button" name="save" class="btn-sm btn-outline-secondary p-1 bd-highlight" value="Table"
                        id="statusstable">
                    <input type="button" name="save" class="btn-sm btn-outline-info p-1 bd-highlight" value="Graph"
                        id="status">
                </li>
                <li class="sb-main d-flex bd-highlight bg-dark">
                    <div class="sb-sub p-1 flex-grow-1 bd-highlight">Avg Age per Content</div>
                    <input type="button" name="save" class="btn-sm btn-outline-secondary p-1 bd-highlight" value="Table"
                        id="agestable">
                    <input type="button" name="save" class="btn-sm btn-outline-info p-1 bd-highlight" value="Graph"
                        id="ages">
                </li>
                <li>
                    <img src="../pictures/har.png" height="150px" width="auto" alt="HAR Observation & Statistics">
                </li>
            </ul>
        </div>
        <div id="xanax" style="width:40%; margin-left: 12%;" class="py-4">
            <canvas id="ch1"></canvas>
        </div>
        <div id="table" style="width:50%; margin-left: 12%;" class="text-center py-4 admintable"></div>


    </div>

    <footer class="footer mt-auto py-3 bg-dark d-none d-sm-block">
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