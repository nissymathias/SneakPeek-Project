<?php

// Define database connection variables
$servername = "localhost";
$username = "web";
$password = "web";
$dbname = "example_db";

// Create connection
$conn = mysqli_connect($servername, $username, $password, $dbname);

// Check connection
if (!$conn) {
  die("Connection failed: " . mysqli_connect_error());
}

// Check if the form was submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
  
   // Check if required fields are empty
   if (empty($_POST["firstname"]) || empty($_POST["lastname"]) || empty($_POST["username"]) || empty($_POST["email"]) ) {
    echo json_encode(array('error' => 'Required fields cannot be empty.'));
    exit;
  }

  // Get form data and sanitize it
  $firstname = mysqli_real_escape_string($conn, $_POST["firstname"]);
  $lastname = mysqli_real_escape_string($conn, $_POST["lastname"]);
  $username = mysqli_real_escape_string($conn, $_POST["username"]);
  $password = mysqli_real_escape_string($conn, $_POST["password"]);
  $email = mysqli_real_escape_string($conn, $_POST["email"]);
  $dob = mysqli_real_escape_string($conn, $_POST["dob"]);
  $gender = mysqli_real_escape_string($conn, $_POST["gender"]);
  $phone = mysqli_real_escape_string($conn, $_POST["phone"]);
  
  // Hash the password using bcrypt
  $hashed_password = password_hash($password, PASSWORD_BCRYPT);
  
  // Prepare the SQL query to insert the data into the database
  $sql = "INSERT INTO users (firstname, lastname, username, email, dob, gender, phone, password)
          VALUES ('$firstname', '$lastname', '$username', '$email', '$dob', '$gender', '$phone', '$hashed_password')";
  
  // Execute the query and check for errors
  if (mysqli_query($conn, $sql)) {
    session_start();
    $_SESSION["loggedin"] = true;
    $_SESSION["username"] = $username;
    
    echo json_encode(array('success' => true));

    // Redirect the user to a secure page
    // header("location: ../index.html");
  } else {
    echo json_encode(array('error' => 'Error: ' . $sql . '<br>' . $conn->error));

  }
}

// Close the database connection
mysqli_close($conn);

?>