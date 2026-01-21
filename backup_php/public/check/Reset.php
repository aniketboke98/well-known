<?php 

include 'RedX.php';


$package_name = 'Package';
$username_name = 'Username';
$usernamep_name = 'UsernamePass';

$package_name=$_REQUEST[$package_name];
$username_name=$_REQUEST[$username_name];
$usernamep_name=$_REQUEST[$usernamep_name];

if ($package_name == null || $username_name == null || $usernamep_name == null){
header("Location: https://t.me/RedZONERROR"); die(); } else { if ($package_name == "com.redzonerror.loader") {

$query = $conn->query("SELECT * FROM `keys_code` WHERE `user_key` = '$username_name'");
if($query->num_rows < 1){ die("User not found!!!"); } else {

$G1 = "SELECT * FROM `keys_code` WHERE `user_key` = '$username_name'"; //Get
$G2 = mysqli_query($conn, $G1); //Get Database use
$G3 = mysqli_fetch_array($G2); //Get Database

$ReTime = $G3["key_reset_time"]; //Face Database
$SerToken = $G3["key_reset_token"]; //Face Database
  
if ($usernamep_name == null) { die(); } else {
if ($ReTime == "0") { die("Maximum Time Reached!!"); } else { if ($ReTime == "1") { 

$query = $conn->query("UPDATE `keys_code` SET `devices` = '' WHERE `user_key` = '$username_name'");
$query = $conn->query("UPDATE `keys_code` SET `key_reset_time` = '0' WHERE `user_key` = '$username_name'");
die("Key Reset Successful"); } else { if ($ReTime == "2") { 

$query = $conn->query("UPDATE `keys_code` SET `devices` = '' WHERE `user_key` = '$username_name'");
$query = $conn->query("UPDATE `keys_code` SET `key_reset_time` = '1' WHERE `user_key` = '$username_name'");
die("Key Reset Successful"); } else { if ($ReTime == "3") { 

$query = $conn->query("UPDATE `keys_code` SET `devices` = '' WHERE `user_key` = '$username_name'");
$query = $conn->query("UPDATE `keys_code` SET `key_reset_time` = '2' WHERE `user_key` = '$username_name'");
die("Key Reset Successful"); } else { die();  }    }     }       }      }      }        } else { die(); }        }          ?>
