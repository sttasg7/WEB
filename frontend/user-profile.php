<?php
include '../backend/logincheck.php';
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>User Dashboard</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
    <link href="../css/mine.css" rel="stylesheet">
    <link href="../css/login.css" rel="stylesheet">
    <link rel="icon" href="../pictures/favicon.png" type="img/png">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>

</head>
<style>
    .form {
        margin-left: 0%;
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
            if ($loginst == 1) { ?>
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
            if ($loginst != 1) { ?>
                <div class="collapse navbar-collapse" id="navmenu">
                    <ul class="navbar-nav ms-auto justify-content-end">
                        <li class="nav-item">
                            <a class="nav-link active" href="../frontend/user-profile.php">Home</a>
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
                        <?php if ($loginst == 2) { ?>
                            <li class="nav-item link-cur" style="margin-left: 2%;">
                                <div class="dropdown">
                                    <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false">Admin Tools</button>
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
                            <form action="../backend/logout.php" method="post"><input type="submit" class="btn btn-danger" name="logout" value="Log Out"></input>
                            </form>
                        </li>
                    </ul>
                </div>
            <?php } else { ?>
                <div class="collapse navbar-collapse" id="navmenu">
                    <ul class="navbar-nav ms-auto justify-content-end">
                        <li class="nav-item">
                            <a class="nav-link active" aria-current="page" href="../frontend/faq.php">FAQs</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="../frontend/about.php">About</a>
                        </li>
                    </ul>
                </div>

                <div class="d-grid gap-2 d-md-block d-none d-md-block" style="margin-right: -5%">
                    <a href="../frontend/login.php">
                        <button type=" button" class="btn btn-outline-secondary">Sign In </button></a>
                    <a href="../frontend/register.php">
                        <button type="button" class="btn btn-primary">Sign Up</button></a>
                </div>
            <?php } ?>
        </div>
    </nav>

    <div class="container py-4" >

        <h5> You have logged in as: <b><?php echo $_SESSION['username'] ?></b> </h5>
        <hr>


        <div id="entries"></div>
        <div id="last-entry"></div>
        <hr>

        <input id="b1" type="button" value="Change Account Credentials" class="btn btn-outline-danger">

        <div class="py-3" id="hidb1" hidden>
            <div class="change-info" id="info">
                Below you can change your username or password. <br> Leave a field empty if you wish to not alter it.
                <br>
                You have to confirm your current password in order for the changes to go through!
            </div>
            <div class="form d-lg-flex py-5" id="change">
                <form class="container" method="POST">
                    <div class="mb-3 row">
                        <label for="username" class="col-sm-2 col-form-label fs-5 fw-light">Username:</label>
                        <div class="col-sm-1">
                            <input type="username" id="username" class="form-control" style="background-color:rgba(255,255,255, 0.6);" placeholder="<?php echo $_SESSION['username'] ?>">
                        </div>
                    </div>


                    <div class="mb-3 row">
                        <label for="inputPassword" class="col-sm-2 col-form-label fs-5 fw-light">Old Password:</label>
                        <div class="col-sm-1">
                            <input type="password" id="oldpass" minlength="8" pattern="(?=.*\d)(?=.*[A-Z])(?=.*\W.*)" class="form-control" style="background-color:rgba(255,255,255, 0.6);">
                        </div>
                    </div>

                    <div class="mb-3 row">
                        <label for="inputPassword" class="col-sm-2 col-form-label fs-5 fw-light">New Password:</label>
                        <div class="col-sm-1">
                            <input type="password" id="newpass" minlength="8" pattern="(?=.*\d)(?=.*[A-Z])(?=.*\W.*)" class="form-control" style="background-color:rgba(255,255,255, 0.6);">
                        </div>
                        <p class="criteria">Your password must be
                            <span id="char8"> 8 characters long</span>
                            and must include
                            <span id="symb">a symbol</span>,
                            <span id="numb">a number</span> and
                            <span id="capl">a capital letter</span>.
                        </p>
                    </div>

                    <input type="button" name="save" class="btn btn-outline-danger" value="Change!" id="butsave">
                </form>
            </div>

        </div> <br>

        <div class="mb-3 row"></div>
        <div class="mb-3 row"></div>
        <div class="mb-3 row"></div>
        <div class="mb-3 row"></div>
        <img src="../pictures/har-dark.png" height="150px" width="auto" alt="HAR Observation & Statistics">

    </div>

    
    <div class="mb-3 row"></div>
    <div class="mb-3 row"></div>
    <div class="mb-3 row"></div>
    


    <footer class="footer mt-auto py-3 bg-dark d-none d-sm-block">
        <div class="container">
            <span class="text-muted text-center">CEID © 2021 Copyright: Παναγιώτης Καπνίσης - Τάσσης Στέφανος</span>
        </div>
    </footer>







    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous">
    </script>
    <script src="../js/home.js"></script>
</body>

</html>