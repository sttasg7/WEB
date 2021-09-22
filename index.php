<?php
include 'backend/logincheck.php';
?>

<!DOCTYPE html>
<html>

<?php
    if ($loginst == 1) { ?>

<head>
	<meta charset="UTF-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<title>HAR OS Home Page</title>
	<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet"
		integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous" />
	<link href="css/mine.css" rel="stylesheet" />
	<link href="css/login.css" rel="stylesheet" />
	<link rel="icon" href="https://i.imgur.com/qY7kRzP.png" type="img/png">
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
</head>

<style>
	body {
		background-image: url('pictures/blu.jpg');
		/*background-image: url('../pictures/abstr.png');*/
		background-size: cover;
	}
</style>

<body>

	<!-- Navbar -->
	<nav class="navbar navbar-expand-lg bg-dark navbar-dark">
		<div class="container">
			<a href="index.php">
				<img src="pictures/har.png" height="50px" width="auto" alt="HAR Observation & Statistics">
			</a>
			<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navmenu">
				<span class="navbar-toggler-icon"></span>
			</button>

			<div class="collapse navbar-collapse" id="navmenu">
				<ul class="navbar-nav ms-auto justify-content-end">
					<li class="nav-item">
						<a class="nav-link" aria-current="page" href="frontend/faq.php">FAQs</a>
					</li>
					<li class="nav-item">
						<a class="nav-link" href="frontend/about.php">About</a>
					</li>
				</ul>
			</div>
			<div class="d-grid gap-2 d-md-block d-none d-md-block" style="margin-right: -5%">
				<a href="frontend/login.php">
					<button type=" button" class="btn btn-outline-secondary">Sign In </button></a>
				<a href="frontend/register.php">
					<button type="button" class="btn btn-primary">Sign Up</button></a>
			</div>
		</div>
	</nav>

	<div class="container" align="center" style="padding-top: 20px;">

		<img height="110px" width="auto" alt="HAR Observation & Statistics" src="pictures/har-dark.png"
			style="margin-bottom: 1%;">

		<p class="fs-2 fw-light" align="center">
			Welcome to HAR OS
		</p>
		<p class="fs-2 fw-light" align="center">
			If you have an account
		</p>
		<a href="frontend/login.php">
			<button type="button" class="btn btn-outline-dark float-center" id="login">Login</button>
		</a>
	</div>

	<div class="container" align="center" style="margin-top: 1%; margin-bottom: 40px;">
		<p class="fs-2 fw-light" align="center">
			If you don't have an account, please
		</p>

		<a href="frontend/register.php">
			<button type="button" class="btn btn-outline-dark float-right" id="register">Register</button>
		</a>
	</div>

	<footer class="footer mt-auto py-3 bg-dark">
        <div class="container">
            <span class="text-muted text-center">CEID © 2021 Copyright: Παναγιώτης Καπνίσης - Τάσσης Στέφανος - Ιωάννης Αγγελόπουλος</span>
        </div>
    </footer>

	<script src="js/log_sign.js"></script>
	<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"
		integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM"
		crossorigin="anonymous"></script>

	<?php } else { 
        header("Location: frontend/user-profile.php");
    }?>
</body>

</html>