<?php
  session_start();

  // establish connection to data base
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

  // query for the courses information
  $plan_course = "Kingdom_of_Benzonia_Plan_Course";
  $course = "Kingdom_of_Benzonia_Course";

  $sql = "SELECT * FROM $plan_course, $course
    WHERE $plan_course.course_id = $course.ID
    AND $plan_course.plan_id = $current_plan";
  $courses = $conn->query($sql);

  if ($courses->num_rows == 0){
    die("failed to find courses");
  }



  // close connection
  // $conn->close();
 ?>
