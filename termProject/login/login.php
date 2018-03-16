<?php
  session_start();
  $valid_login = 0;

  if (!isset($_SESSION['count'])) {
    $_SESSION['count'] = 0;
  }
  else {
    $_SESSION['count']++;

    // connect to server
    $conn = new mysqli("james.cedarville.edu", "cs3220", "", "cs3220");

    // check for successful connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    // set up query information
    $uname = $_POST['uname'];
    $pwd = $_POST['pwd'];
    $user_db = "Kingdom_of_Benzonia_User";
    $sql = "SELECT * FROM $user_db
      where user_name=\"$uname\" AND password=\"$pwd\"";

    // query database for results
    $result = $conn->query($sql);

    // check results
    if ($result->num_rows > 0) {
        // a match was found so output the result
        $valid_login = 1;

         $_SESSION['uname'] = $uname;
         $_SESSION['pwd'] = $pwd;

         $row = $result->fetch_assoc();
         $_SESSION['ID'] = $row['ID'];
         $_SESSION['current_plan'] = $row['current_plan'];

        header('Location: ../project4.php');
    } else {
        // no match was found
        $valid_login = 2;
    }
    $conn->close();
  }
?>

<!DOCTYPE html>

<html>

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Project 4</title>

  <link rel="shortcut icon" type="image/x-icon" href="../../img/stolen_icon.png">

  <!-- <script type="text/javascript" src="login.js"></script> -->

  <!-- css sheets -->
  <link type="text/css" rel="stylesheet" href="login.css" />

  </script>

</head>

<body>

  <!-- html for login window -->
  <div class="pad"></div>

  <div id="loginWindow">
    <!-- background image -->

    <div class="pad"></div>

    <!-- actual form -->
    <form id="myform" name="myform" method="post" action="login.php">
      <?php
        if($valid_login == 2){
          echo "ENTER A VALID USERNAME AND PASSWORD YOU DIP SWITCH <br><br>";
        }
      ?>
      <label for="uname"><b>Username</b><label><br>
        <input type="text" placeholder="Enter Username" id="uname" name="uname"><br><br>
        <label for="pwd"><b>Password</b><label><br>
        <input  type="password"
                placeholder="Enter Password"
                id="pwd"
                name="pwd"
                title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
                >
                <br><br>
        <button type="submit">Log In</button>
    </form>

    <div class="pad"></div>
  </div>

  <div class="pad"></div>

</body>

</html>
