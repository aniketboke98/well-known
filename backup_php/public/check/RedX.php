<?php

$myFile = "make/DatabaseConnectionTime/.env";
$lines = file($myFile);

$localhos = trim($lines[16]);
$DataBase = trim($lines[17]);
$UserBase = trim($lines[18]);
$Password = trim($lines[19]);

$localhos = str_replace("database.default.hostname =","",$localhos);
$DataBase = str_replace("database.default.database =","",$DataBase);
$UserBase = str_replace("database.default.username = ","",$UserBase);
$Password = str_replace("database.default.password = ","",$Password);

$conn = new mysqli(trim($localhos), trim($UserBase), trim($Password), trim($DataBase));
if($conn->connect_error != null){
   die($conn->connect_error);
}
