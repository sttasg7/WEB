<?php
session_start();
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>User Dashboard</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
    <link href="mine.css" rel="stylesheet">
    <link rel="icon" href="https://i.imgur.com/qY7kRzP.png" type="img/png">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>

</head>
<style>
    
</style>
<body>
    <div class="container-flex">
        <header class="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
        <a href="user-profile.php" class="d-flex align-items-center col-md-3 mb-2 mb-md-0 text-light text-decoration-none">
            <img src=https://i.imgur.com/MtazLc2.png height="50px" width="auto" alt="HAR Observation & Statistics">
          </a>
    
          <ul class="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
            <li><a href="user-profile.php" class="nav-link px-2 link-light link-cur">Home</a></li>
            <li><a href="user-upload.php" class="nav-link px-2 link-light">Upload</a></li>
            <li><a href="user-map.html" class="nav-link px-2 link-light">Map</a></li>
            <li><a href="faq.html" class="nav-link px-2 link-light">FAQs</a></li>
            <li><a href="about.html" class="nav-link px-2 link-light">About</a></li>
          </ul>
    
          <div class="col-md-3 text-end">            
          <form action="logout.php" method="post"> 
              <input type="submit" class="btn btn-danger" name="logout" value="Log Out"></input></form>
          </div>
        </header>
    </div>
    
    <div class="container">
      
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
<script src="home.js"></script>
</body>
</html>
