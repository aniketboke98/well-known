<?php

$base_urlx="http://".$_SERVER['SERVER_NAME'].dirname($_SERVER["REQUEST_URI"].'?').'/';
$base_urlx=str_replace("/public/check/make/","",$base_urlx);


// if(strpos($_SERVER['REQUEST_URI'],"redx.php")){
//     require_once 'Utils.php';
//     PlainDie(); }


$myFile = "DatabaseConnectionTime/.env";
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
   die($lines);
}
