

<?php
session_start();
  // check to see if valid user
 if(!isset($_SESSION['uname'])){
   header('Location: login/login.php');
 }

 // connect to db
 $conn = new mysqli("james.cedarville.edu", "cs3220", "", "cs3220");

 // check for successful connection
 if ($conn->connect_error) {
     die("Connection failed: " . $conn->connect_error);
 }

 // get info from session
 $ID = $_SESSION['ID'];
 $current_plan = $_SESSION['current_plan']; // temp until passed value

 // get selected plan information for header (may not need)
 $db = "Kingdom_of_Benzonia_Plan";
 $sql = "SELECT * FROM $db WHERE ID = $current_plan";
 $plan = $conn->query($sql);

 if ($plan->num_rows == 0) {
   die("Plan does not exist");
 }

 $plan = $plan->fetch_assoc();
 $name = $plan['Name'];
 $major = $plan['major'];
 $year = $plan['Year'];
 $hours = $plan['Hours'];

 ?>

<!DOCTYPE html>

<html>

<head>
  <meta charset="UTF-8">
  <title>Project 4</title>

  <link rel="shortcut icon" type="image/x-icon" href="../img/stolen_icon.png">
  <link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/v/ju-1.12.1/dt-1.10.16/datatables.min.css" />



  <!-- jquery and javascript -->
  <script src="javascript/jquery-3.3.1.min.js"></script>
  <script type="text/javascript" src="https://cdn.datatables.net/1.10.16/js/jquery.dataTables.min.js"></script>

  <script type="text/javascript" src="javascript/project4_v2.js"></script>
  <script type="text/javascript" src="javascript/matrix.js"></script>

  <!--<link href="http://code.jquery.com/ui/1.10.2/themes/Start/jquery-ui.css" rel="stylesheet" type="text/css">
  <link href="javascript/jquery-ui.theme.css" rel="stylesheet" type="text/css">
  <link href="javascript/jquery-ui.css" rel="stylesheet" type="text/css">-->
  <link href="javascript/jquery-ui-1.12.1.custom/jquery-ui-1.12.1.custom/jquery-ui.css" rel="stylesheet" type="text/css">
  <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.1/jquery.min.js"></script>
  <script type="text/javascript" src="http://code.jquery.com/ui/1.10.2/jquery-ui.js"></script>

  <script>
    $(document).ready(function() {
      $("#accordion").accordion();
    });
  </script>


  <!-- css sheets -->
  <link type="text/css" rel="stylesheet" href="css/project4_v2.css" />



  </script>



</head>

<body onload="load()">
  <canvas id="matrix"></canvas>

  <!-- center box -->

  <div id="page">
    <div id ="header">
    <h1 style="display:inline-block">ORACLE</h1>
    <li><a href="login/logout.php">logout<a></li>
    <li>Options
      <div class="dropdown1">
        <ul><li><a style ="padding: 15px 20 px;" href="http://judah.cedarville.edu">PCA</a></li><li><a href="projects/cornDogsA.html">Part 2</a></li></ul>
      </div>
    </li>
    <li>Login</li>

    <?php echo "<li>Total Credits : $hours </li>" ?>
    <?php echo "<li>Catalog Year : $year</li>" ?>
    <?php echo "<li>Major : $major</li>" ?>
    <?php echo "<li>Student Name : $name </li>" ?>
  </div>
    <div id = "middle">
      <div class="nav" id="nav">
        <label class="semester">Course Requirements</label>
      </div>
      <div id = "classes" class="classes" >
      </div>
    </div>
    <div id ="bottum">
      <div class="missing" id="LL">
        <h2>Color Changer</h2>

        <!-- Trigger/Open The Modal -->
        <button id="myBtn">Change Color</button>

        <!-- The Modal -->
        <div id="myModal" class="modal">

          <!-- Modal content -->
          <div class="modal-content">
            <span class="close">&times;</span>
            <h1>Choose a color.</h1>
            <form onsubmit="changeColor()">
         	 Select your favorite color:
         	 <input id = "colorPicker"  type="color" name="favcolor" value="#ff0000">
         	 <input type="submit">
        	</form>
          </div>

        </div>

        <script>
        function changeColor(){
          // alert(document.getElementById("colorPicker").value);
          document.documentElement.style.setProperty("--text-color", document.getElementById("colorPicker").value);
          event.preventDefault();
          //alert(value);
        }


        // Get the modal
        var modal = document.getElementById('myModal');

        // Get the button that opens the modal
        var btn = document.getElementById("myBtn");

        // Get the <span> element that closes the modal
        var span = document.getElementsByClassName("close")[0];

        // When the user clicks the button, open the modal
        btn.onclick = function() {
            modal.style.display = "block";
        }

        // When the user clicks on <span> (x), close the modal
        span.onclick = function() {
            modal.style.display = "none";
        }

        // When the user clicks anywhere outside of the modal, close it
        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }
        </script>
      </div>
      <div id="derp" class="derp">
        <h1>Course Finder</h1>
      </div>
    </div>
  </div>

</body>

</html>
