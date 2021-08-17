<?php
include '../backend/logincheck.php';
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>HAR OS Sign Up</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous" />
    <link href="../css/mine.css" rel="stylesheet" />
    <link href="../css/login.css" rel="stylesheet" />
    <link rel="icon" href="../pictures/favicon.png" type="img/png">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
</head>

<body>
    <!-- Navbar -->
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

            <div class="collapse navbar-collapse" id="navmenu">
                <ul class="navbar-nav ms-auto justify-content-end">
                    <li class="nav-item">
                        <a class="nav-link" aria-current="page" href="../frontend/faq.php">FAQs</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="../frontend/about.php">About</a>
                    </li>
                </ul>
            </div>

            <div class="d-grid gap-2 d-md-block d-none d-md-block" style="margin-right: -5%">
                <a href="../frontend/login.php">
                    <button type=" button" class="btn btn-outline-secondary">Sign In</button></a>
                <a href="../frontend/register.php">
                    <button type="button" class="btn btn-primary">Sign Up</button></a>
            </div>

        </div>
    </nav>


    <!-- Welcome Text-->
    <h1 class="text-center py-4" id="welcome" style="padding-top: 20px; color: #0271d8">Welcome to HAR Observation &
        Statistics</h1>

    <!-- Image -->
    <div class="container" align="center">
        <img height="110px" class="invert" width="auto" align="center" alt="HAR Observation & Statistics"
            src="../pictures/har-dark.png">
    </div>

    <!-- Input Boxes -->
    <div class="form d-lg-flex p-5" id="welcome">
        <form class="container" method="POST">
            <div class="mb-3 row">

            </div>
            <div class="mb-3 row">
                <label for="staticEmail" class="col-sm-2 col-form-label">Email:</label>
                <div class="col-sm-1">
                    <input type="email" id="email_log" name="em" class="form-control" id="exampleFormControlInput1"
                        placeholder="someone@example.com" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$">
                </div>
                <span class="criteria" id="email-invalid" style="color: red" hidden>Please fill field.</span>
            </div>
            <div class="mb-3 row">
                <label for="inputPassword" class="col-sm-2 col-form-label">Password:</label>
                <div class="col-sm-1">
                    <input type="password" id="password_log" name="pw" minlength="8"
                        pattern="(?=.*\d)(?=.*[A-Z])(?=.*\W.*)" class="form-control">
                </div>
                <span class="criteria" id="pass-invalid" style="color: red" hidden>Please fill field.</span>
            </div>

            <input type="button" name="save" class="btn btn-primary" value="Login!" id="butlogin">
        </form>
    </div>

    <footer class="footer mt-auto py-3 bg-light d-none d-sm-block">
        <div class="container">
            <span class="text-muted text-center">CEID © 2021 Copyright: Παναγιώτης Καπνίσης - Τάσσης Στέφανος</span>
        </div>
    </footer>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous">
    </script>

    <script src="../js/log_sign.js"></script>
</body>

</html>