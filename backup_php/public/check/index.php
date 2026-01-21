<?php 

include 'RedX.php';

//Start Getting
$tom = 'time';
$package = 'package'; 
$user_key ='user_key';
$jerry=$_REQUEST[$tom];
$uKey=$_REQUEST[$user_key];
$package=$_REQUEST[$package];
$sEx = 'A-Dek-Kon-Aya-BATICHOD';

if ($package != "com.redzonerror.loader"){
header("Location: https://t.me/RedXStudio"); die(); } else { 

$G1 = "SELECT * FROM `keys_code` WHERE `user_key` = '$uKey'"; //Get
$G2 = mysqli_query($conn, $G1); //Get Database use
$G3 = mysqli_fetch_array($G2); //Get Database

$G11 = "SELECT * FROM `function_code` WHERE `id_path` = 1"; //Get
$G22 = mysqli_query($conn, $G11); //Get Database use
$G33 = mysqli_fetch_array($G22); //Get Database


date_default_timezone_set('Asia/Kolkata'); $phpServerTime = date('Y-m-d H:i:s'); $apkServerTime = date_create($jerry); $sexServerTime = date_create($phpServerTime);
     
if ($G3["expired_date"] == null) { $expiredX = date('Y-m-d H:i:s',strtotime('+'.$G3["duration"].' hours',strtotime($phpServerTime))); } else {  $expiredX = $G3["duration"];  }
   
  $interval = date_diff($apkServerTime,$sexServerTime);
               $ddx = $interval->d;
               $hhx = $interval->h;
               $mmx = $interval->i;
               $ssx = $interval->s;
$expiredXx = date('Y-m-d H:i:s',strtotime('-'.$ddx.' day -'.$hhx.' hour -'.$mmx.' minutes -'.$ssx.' seconds',strtotime($expiredX)));
               
$current_timestampxx = time();

$query = $conn->query("SELECT * FROM `keys_code` WHERE `user_key` = '$uKey'");
if($query->num_rows < 1){  $data = [ 'status' => false, 'reason' => 'Your key/game not registered' ]; 
} else { if ($phpServerTime > $expiredX){ $data = [ 'status' => false, 'reason' => 'Your credential has expired' ];
} else { $data = ['status' => true, 'FuckYou' => false, 'ExTime' => $expiredXx, 'ModName' => $G33["ModName"], 'Token' => $uKey.$sDev.$sEx, 'rng' => $current_timestampxx ]; } }
    
                
header('Content-Type: text/plain'); $Result0=json_encode($data);
$Result1 = base64_encode($Result0); $Result2 = base64_encode('.'.$Result1);
$Result3 = base64_encode('HI> $FUcKUNLiMTAkWFIHARGyAFHHF0aD'.$Result2);
$Result4 = base64_encode('USER> $FUcKUNLiMITEdkWOQLSTjGjSEYTF0aD'.$Result3);
$Result5 = base64_encode('RedXStudio ==WTFSDIKiUAJrDHiDEMmXVkWFN0W'.$Result4);
//echo '➲Check[-MAKE BY @RedZONERROR-] $VaiWGUvoSQIBArWKiUmXExVkWFN0W'.$Result5;
echo $Result0;
} ?>