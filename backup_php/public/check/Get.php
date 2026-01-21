<?php 

include 'RedX.php';

//Start Getting
$user = 'user'; 
$package = 'package'; 
$user=$_REQUEST[$user];
$package=$_REQUEST[$package];
if ($package != "com.redzonerror.loader"){
header("Location: https://t.me/RedZONERROR"); die(); } else { 

$G1 = "SELECT * FROM `keys_code` WHERE `user_key` = '$user'"; //Get
$G2 = mysqli_query($conn, $G1); //Get Database use
$G3 = mysqli_fetch_array($G2); //Get Database

header('Content-Type: text/plain'); $Result0=$G3["key_reset_token"]; 
$Result1 = base64_encode($Result0); $Result2 = base64_encode('.'.$Result1);
$Result3 = base64_encode('HI> $FUcKUNLiMTAkWFIHARGyAFHHF0aD'.$Result2);
$Result4 = base64_encode('USER> $FUcKUNLiMITEdkWOQLSTjGjSEYTF0aD'.$Result3);
$Result5 = base64_encode('RedXStudio ==WTFSDIKiUAJrDHiDEMmXVkWFN0W'.$Result4);
echo '➲Check[-MAKE BY @RedZONERROR-] $VaiWGUvoSQIBArWKiUmXExVkWFN0W'.$Result5; } ?>