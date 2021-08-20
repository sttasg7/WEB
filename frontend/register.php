<?php
include '../backend/logincheck.php';
?>

<!DOCTYPE html>
<html lang="en">

<?php
            if ($loginst == 1) { ?>

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

<style>
	body {
		background-image: url('../pictures/blu.jpg');
		/*background-image: url('../pictures/abstr.png');*/
		background-size: cover;
	}
</style>

<body>
    <!-- Navbar -->
    <nav class="navbar navbar-expand-lg bg-dark navbar-dark">
        <div class="container">
            <a href="../index.php">
                <img src="../pictures/har.png" height="50px" width="auto" alt="HAR Observation & Statistics">
            </a>
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
                    <button type=" button" class="btn btn-outline-secondary">Sign In </button></a>
                <a href="../frontend/register.php">
                    <button type="button" class="btn btn-primary">Sign Up</button></a>
            </div>
        </div>
    </nav>

    <!-- Image -->
    <div class="container" align="center" style="padding-top: 20px;">
        <img height="110px" class="invert" width="auto" align="center" alt="HAR Observation & Statistics"
            src="../pictures/har-dark.png">
    </div>

    <p class="text-center fs-3 fw-light py-4">
        Please fill in the fileds below to create an account
    </p>

    <!-- Input Boxes -->
    <div class="form d-lg-flex py-2" id="welcome" style="padding-left: 50px;">
        <form class="container" method="POST">
            <div class="mb-3 row">
                <label for="username" class="col-sm-2 col-form-label fw-light fs-5">Username:</label>
                <div class="col-sm-1">
                    <input type="username" id="username" class="form-control" placeholder="username" style="background-color:rgba(255,255,255, 0.6);">
                </div>
                <span class="criteria" id="user-invalid" style="color: red" hidden>Username is taken.</span>
            </div>
            <div class="mb-3 row">
                <label for="staticEmail" class="col-sm-2 col-form-label fw-light fs-5">Email:</label>
                <div class="col-sm-1">
                    <input type="email" id="email" class="form-control" id="exampleFormControlInput1"
                        placeholder="someone@example.com" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" style="background-color:rgba(255,255,255, 0.6);">
                </div>
                <span class="criteria" id="email-invalid" style="color: red" hidden>An account already exists with this email.</span>
            </div>
            <div class="mb-3 row">
                <label for="inputPassword" class="col-sm-2 col-form-label fw-light fs-5">Password:</label>
                <div class="col-sm-1">
                    <input type="password" id="password" minlength="8" pattern="(?=.*\d)(?=.*[A-Z])(?=.*\W.*)"
                        class="form-control" style="background-color:rgba(255,255,255, 0.6);">
                </div>
                <p class="criteria">Your password must be
                    <span id="char8"> 8 characters long</span>
                    and must include
                    <span id="symb">a symbol</span>,
                    <span id="numb">a number</span> and
                    <span id="capl">a capital letter</span>.
                </p>
            </div>

            <input type="button" name="save" class="btn btn-outline-dark" value="Register!" id="butsave" style="margin-bottom: 3%;">
        </form>
    </div>

    <footer class="footer mt-auto py-3 bg-dark d-none d-sm-block">
        <div class="container">
            <span class="text-muted text-center">CEID © 2021 Copyright: Παναγιώτης Καπνίσης - Τάσσης Στέφανος</span>
        </div>
    </footer>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous">
    </script>

    <script src="../js/log_sign.js"></script>

    <?php } else { 
        header("Location: user-profile.php");
    }?>
</body>

</html>