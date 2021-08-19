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
    <link rel="icon" href="../pictures/favicon.png" type="img/png">

</head>
<style>   
    body {
    background-image: url('../pictures/blu.jpg');
    /*background-image: url('../pictures/abstr.png');*/
    background-size: cover;
    }

    .faq-ans {
        background: rgba(255,255,255,0.2);
    }
</style>

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

            <?php 
            if ($loginst == 1){ ?>

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
                        <a class="nav-link" href="../frontend/user-map.php">Map</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link active" aria-current="page" href="../frontend/faq.php">FAQs</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="../frontend/about.php">About</a>
                    </li>

                    <?php if ($loginst == 2){ ?>
                    <li class="nav-item link-cur">
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
                <?php } ?>
            </div>
        </div>
    </nav>

    <div class="container text-center py-4"
        style="border-style: double; width: 50%; margin-bottom: 1%; margin-top: 1%;">
        <p><strong> In this page you can read essential info about the website and how it works.</strong></p>
    </div>

    <div class="container">
        <div class="h4 faq-que">What is HAR OS?</div>
        <div class="p faq-ans">HAR OS is a tool which processes HAR files given by the user and displays exported data
            on
            a map.</div>

        <div class="h4 faq-que">What is a HAR file?</div>
        <div class="p faq-ans">In simple terms, a HAR file is a record of all HTTP transactions your internet browser
            made. It stores information that can later be harvested for analysis by various tools (eg. our website!).
            More info about them <a href="http://www.softwareishard.com/blog/har-12-spec/">here</a>.</div>

        <div class="h4 faq-que">How can I upload a HAR file?</div>

        <div class="p faq-ans">Easy! Use the
            <?php 
        if ($loginst == 1){ ?>
            <a href="#" onclick="loginalert()">Upload</a>
            <?php } else { ?>
            <a href="../frontend/user-upload.php">Upload</a>
            <?php } ?>
            option
        </div>
        <div class="h4 faq-que">And then what?</div>
        <div class="p faq-ans">Then you can see an analysis of all recorded connections on your personal
            <?php 
        if ($loginst == 1){ ?>
            <a href="#" onclick="mapalert()">Map</a>
            <?php } else { ?>
            <a href="../frontend/user-map.php">Map</a>
            <?php } ?>


        </div>

        <div class="h4 faq-que">There are sensitive info on my HAR file</div>
        <div class="p faq-ans">Don't worry about it! <br>
            Every file uploaded to the server is parsed through our privacy tool. You can use the privacy tool yourself,
            use the <div class="btn btn-info">Export</div>
            option on our
            <?php 
            if ($loginst == 1){ ?>
            <a href="#" onclick="loginalert()">Upload</a>
            <?php } else { ?>
            <a href="../frontend/user-upload.php">Upload</a>
            <?php } ?>
            page and you'll get a new HAR file with all
            private info
            discarded
        </div>

        <div class="h4 faq-que">So which data do you keep?</div>
        <div class="p faq-ans">Only vital ones for the analysis. More specifically these: <br>
            <div class="container py-3">
                <table class="table table-borderless table-hover">

                    <tbody>
                        <tr>
                            <th scope="row">entries</th>
                            <td>startedDateTime</td>
                        </tr>
                        <tr>
                            <th scope="row" class="table-dark"></th>
                            <td class="table-dark">timings</td>
                        </tr>
                        <tr>
                            <th scope="row"></th>
                            <td>serverIPAddress</td>
                        </tr>
                        <tr>
                            <th scope="row" class="table-dark">timings</th>
                            <td class="table-dark">wait</td>
                        </tr>
                        <tr>
                            <th scope="row">request</th>
                            <td>method</td>
                        </tr>
                        <tr>
                            <th scope="row" class="table-dark"></th>
                            <td class="table-dark">url</td>
                        </tr>

                        <tr>
                            <th scope="row"></th>
                            <td>response</td>
                        </tr>
                        <tr>
                            <th scope="row" class="table-dark"></th>
                            <td class="table-dark">status</td>
                        </tr>
                        <tr>
                            <th scope="row"></th>
                            <td>statusText</td>
                        </tr>

                        <tr>
                            <th scope="row" class="table-dark">headers</th>
                            <td class="table-dark">content-type</td>
                        </tr>
                        <tr>
                            <th scope="row"></th>
                            <td>cache-control</td>
                        </tr>
                        <tr>
                            <th scope="row" class="table-dark"></th>
                            <td class="table-dark">pragma</td>
                        </tr>
                        <tr>
                            <th scope="row"></th>
                            <td>expires</td>
                        </tr>
                        <tr>
                            <th scope="row" class="table-dark"></th>
                            <td class="table-dark">age</td>
                        </tr>
                        <tr>
                            <th scope="row"></th>
                            <td>last-modified</td>
                        </tr>
                        <tr>
                            <th scope="row" class="table-dark"></th>
                            <td class="table-dark">host</td>
                        </tr>
                    </tbody>

                </table>
            </div>
        </div>
    </div>



    <div class="divider"></div>


    <footer class="footer mt-auto py-3 bg-dark d-none d-sm-block">
        <div class="container">
            <span class="text-muted text-center">CEID © 2021 Copyright: Παναγιώτης Καπνίσης - Τάσσης Στέφανος</span>
        </div>
    </footer>


    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous">
    </script>

    <script>
    function loginalert() {
        alert("You must be logged in to Upload!");
    }

    function mapalert() {
        alert("You must be logged in see the Map!");
    }
    </script>

</body>

</html>