<?php
session_start();

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

// Check if the user is logged in
if(isset($_SESSION['username'])) {
    $username = $_SESSION['username'];
    $query = "SELECT * FROM users WHERE username='$username'";
    $result = mysqli_query($conn, $query);
    $row = mysqli_fetch_assoc($result);
    
    // Return the username as JSON
    echo json_encode($row);
} else {
    // Return a default value for guests
    echo json_encode(array('username' => 'Guest'));
}

// Close the database connection
mysqli_close($conn);
?>