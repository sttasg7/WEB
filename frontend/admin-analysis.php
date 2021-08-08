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
    <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.5.0/chart.min.js"></script>
    <script src="../js/palette.js"></script>
    <script src="../js/admin-analysis.js"></script>

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
<div class="container py-1"></div>
<div class="container">
    <section style="display: flex; flex-direction: row; ">
        <div style="width:20%;">
        <ul class="navbar-nav py-4 d-flex align-items-stretch bg-dark"> 
            <li class="sb-main d-flex bd-highlight bg-dark">
                <div class="p-1 flex-grow-1 bd-highlight">Content Type</div>
                <input type="button" name="save" class="btn-sm btn-outline-secondary p-1 bd-highlight" value="Table" id="ct_table">
                <input type="button" name="save" class="btn-sm btn-outline-info p-1 bd-highlight" value="Graph" id="ct_graph">
            </li>
            <li class="sb-main d-flex bd-highlight bg-dark">
                <div class="p-1 flex-grow-1 bd-highlight">Day of Week</div>
                <input type="button" name="save" class="btn-sm btn-outline-secondary p-1 bd-highlight" value="Table" id="day_table">
                <input type="button" name="save" class="btn-sm btn-outline-info p-1 bd-highlight" value="Graph" id="day_graph">
            </li>
            <li class="sb-main d-flex bd-highlight bg-dark">
                <div class="sb-sub p-1 flex-grow-1 bd-highlight">HTTP Method</div>
                <input type="button" name="save" class="btn-sm btn-outline-secondary p-1 bd-highlight" value="Table" id="method_table">
                <input type="button" name="save" class="btn-sm btn-outline-info p-1 bd-highlight" value="Graph" id="method_graph">
            </li>
            <li class="sb-main d-flex bd-highlight bg-dark">
                <div class="sb-sub p-1 flex-grow-1 bd-highlight">Internet Provider</div>
                <input type="button" name="save" class="btn-sm btn-outline-secondary p-1 bd-highlight" value="Table" id="isp_table">
                <input type="button" name="save" class="btn-sm btn-outline-info p-1 bd-highlight" value="Graph" id="isp_graph">
            </li>
        </ul>
        </div>

        <div id="xanax" style="width:60%; margin-left: 2%;" class="py-4">
            <canvas id="ch1"></canvas>                       
        </div>

        <div id="table" style="width:60%; margin-left: 2%;" class="text-center py-4">aaaa</div>

        <div style="width:20%; margin-left:2%">
            <ul id="filt" class="navbar-nav bg-dark sb-main"></ul>
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
