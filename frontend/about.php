<?php
include '../backend/logincheck.php';
?>

<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>User Dashboard</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet"
    integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
  <link href="../css/mine.css" rel="stylesheet">
  <link href="../css/login.css" rel="stylesheet">
  <link rel="icon" href="https://i.imgur.com/qY7kRzP.png" type="img/png">

</head>
<style>

</style>

<body>

  <nav class="navbar navbar-expand-lg bg-dark navbar-dark">
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

      <?php 
            if ($loginst == 1){ ?>

            <div class="collapse navbar-collapse" id="navmenu">
                <ul class="navbar-nav ms-auto justify-content-end">
                    <li class="nav-item">
                        <a class="nav-link" aria-current="page" href="../frontend/faq.php">FAQs</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link active" href="../frontend/about.php">About</a>
                    </li>
                </ul>
            </div>

            <div class="d-grid gap-2 d-md-block d-none d-md-block" style="margin-right: -5%">
                <a href="../frontend/login.php">
                    <button type=" button" class="btn btn-outline-secondary">Sign In </button></a>
                <a href="../frontend/register.php">
                    <button type="button" class="btn btn-primary">Sign Up</button></a>
            </div>

            <?php } else { ?>

            <div class="collapse navbar-collapse" id="navmenu">
                <ul class="navbar-nav ms-auto justify-content-end">
                    <li class="nav-item">
                        <a class="nav-link" href="../frontend/user-profile.php">Home</a>
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
                        <a class="nav-link active" href="../frontend/about.php">About</a>
                    </li>
                </ul>
            </div>

            <div class="d-grid gap-2 d-md-block d-none d-md-block" style="margin-right: -5%">
                <form action="../backend/logout.php" method="post">
                    <input type="submit" class="btn btn-danger" name="logout" value="Log Out"></input>
                </form>
            </div>

            <?php } ?>
    </div>
  </nav>

  <div class="mb-3 row">
  </div>

  <div class="container" align="center">
    <img height="110px" class="invert" width="auto" align="center" alt="HAR Observation & Statistics"
      src="../pictures/har-dark.png">
  </div>

  <div class="py-4 container text-center">
    <p>This is a project created by CEID UPatras students Panos, Stefanos for the "Programming and Systems on
      the World Wide Web" course of the 8th semester</p>
    <p>You can visit the project's <a href="https://github.com/sttasg7/WEB">github</a> page to monitor our progress</p>
    <p>Special thanks to our teachers for their help, <a href="https://www.w3schools.com/">W3Schools</a>, <a
        href="https://stackoverflow.com/">Stack Overflow</a> for their existence and <a
        href="https://getbootstrap.com">Bootstrap</a> for their great CSS </p>
  </div>



  </div>
  <div class="mb-3 row">
  </div>
  <div class="mb-3 row">
  </div>
  <div class="mb-3 row">
  </div>
  <div class="mb-3 row">
  </div>
  <div class="mb-3 row">
  </div>
  <div class="mb-3 row">
  </div>
  <div class="mb-3 row">
  </div>
  <div class="mb-3 row">
  </div>
  <div class="mb-3 row">
  </div>
  <div class="mb-3 row">
  </div>
  <div class="mb-3 row">
  </div>
  <div class="mb-3 row">
  </div>

  </div>


  <footer class="footer mt-auto py-3 bg-light d-none d-sm-block">
    <div class="container">
      <span class="text-muted text-center">CEID © 2021 Copyright: Παναγιώτης Καπνίσης - Τάσσης Στέφανος</span>
    </div>
  </footer>


  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"
    integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM"
    crossorigin="anonymous"></script>


</body>

</html>