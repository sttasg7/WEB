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
    <link rel="icon" href="https://i.imgur.com/qY7kRzP.png" type="img/png">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>

</head>
<style>
    
</style>
<body>
    <!-- Navbar -->
    <nav class="navbar navbar-expand-lg bg-dark navbar-dark">
        <div class="container">
            <a href="../frontend/user-profile.php">
                <img src="../pictures/har.png" height="50px" width="auto" alt="HAR Observation & Statistics">
            </a>
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
                        <a class="nav-link" aria-current="page" href="../frontend/faq.html">FAQs</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="../frontend/about.html">About</a>
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
    
    <div class="container py-4">
      
        Hello Mr. <?php echo $_SESSION['username']?> 

        <!-- ΕΙΝΑΙ ΕΝΤΕΛΩΣ ΧΥΜΑ, ΘΕΛΟΥΝ STYLING -->

        <div id="entries"></div>
        <div id="last-entry"></div><br><br><br><br>


        <input id="toggle" type="button" value="change info" class="btn btn-success" onclick=toggleform()>
        <div id="change-pass">
            <form id="register_form" name="form1" method="post">
		    <div class="container" id="inputbox">
			    <p class="text-center fs-18 text-dark m-t-150">Change the field you want and press Change!</p>
                <div class="mb-3 row">
			    	<label for="username" class="col-sm-2 col-form-label">Username:</label>
	    			<div class="col-sm-1">
				    	<input type="username" id="username" class="form-control" value="<?php echo $_SESSION['username']?>" >
				    </div>
			    </div>
		    	<div class="mb-3 row">
				    <label for="staticEmail" class="col-sm-2 col-form-label">Email:</label>
			        <div class="col-sm-1">
				    	<input type="email" id="email" class="form-control" id="exampleFormControlInput1" value="<?php echo $_SESSION['email']?>" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$">
				    </div>
			    </div>
		    	<div class="mb-3 row">
		    		<label for="inputPassword" class="col-sm-2 col-form-label">Password:</label>
		        		<div class="col-sm-1">
		    			<input type="password" id="password" minlength="8" pattern="(?=.*\d)(?=.*[A-Z])(?=.*\W.*)" class="form-control">
		        		</div>
		    	</div>
                

		    <input type="button" name="save" class="btn btn-primary" value="Change!" id="butchange">
        
	        </form>
        </div>


    </div>  
      
<footer class="footer">
        <div class="container">
            <div class="copyright float-left">
                <p class="mt-5 mb-3 text-muted"> Made by CR7-SKE &copy;2021</p>
            </div>
        </div>
    </footer>


    
        
    


<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
<script src="../js/home.js"></script>
</body>
</html>
