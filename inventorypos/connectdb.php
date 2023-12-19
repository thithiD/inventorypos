<?php
$host = " 127.0.0.1";
$username = "root"; //username
$password = ""; //password
$dbname = "pos_db";

try{
  $pdo = new PDO("mysql:host=$host;dbname=pos_db", "root", "");

}catch (PDOException $e) {
  // Log the error or handle it in a way that suits your application
  error_log("Connection failed: " . $e->getMessage());
  echo 'Connection failed';
}
?> 