<?php 
session_start();
include 'redx.php';

$StartDatexx = date('Y m d  H i s');

if(!isset($_SESSION["OK"])):
header('Location: index.php'); endif;


//$StartDatexx = str_replace(' ', '', $StartDatex);

$GetX = "SELECT * FROM function_code WHERE id_path = '1'";
$GetXx = mysqli_query($conn, $GetX);
$GetAll = mysqli_fetch_array($GetXx);

?>


<!DOCTYPE html>
<html>
  <head>
    <title>Admin Funcation</title>
    <meta name="robots" content="noindex" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.5" />
    <link rel="stylesheet" href="adminPanelSet.css" />
    
       
    
<link rel="apple-touch-icon" sizes="180x180" href="IconCreateFuncationXx/apple-touch-icon.png">
<link rel="icon" type="image/png" sizes="32x32" href="IconCreateFuncationXx/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="IconCreateFuncationXx/favicon-16x16.png">
<link rel="manifest" href="IconCreateFuncationXx/site.webmanifest">
<link rel="mask-icon" href="IconCreateFuncationXx/safari-pinned-tab.svg" color="#5bbad5">
<meta name="msapplication-TileColor" content="#603cba">
<meta name="theme-color" content="#ffffff">

   

    <style>
.button-wrap {
  position: relative;
}
.button {
  display: inline-block;
  padding: 6px 10px;
  cursor: pointer;
  border-radius: 3px;
  background-color: #0073ff;
  font-size: 19px;
  font-weight: bold;
  color: #fff;
}
.button1 {
  display: inline-block;
  padding: 5px 11px;
  cursor: pointer;
  border-radius: 5px;
  background-color: #e8e8e8;
  font-size: 14px;
  font-weight: bold;
  color: #ff0000;
}
    </style>




    
    
    
    
  </head>
  <body>
    <!-- (A) SIDEBAR -->
    <div id="pgside">
 <a href="../make/index.php">
  <i class="ico">&#9733;</i>
  <i class="txt">Login</i>
</a>
 <a href="../make/index1.php" class="current">
  <i class="ico">&#9728;</i>
  <i class="txt">Make Key</i>
</a>
<a href="../make/index2.php">
  <i class="ico">&#9733;</i>
  <i class="txt">Control Panel</i>
</a>

    </div>

    <!-- (B) MAIN -->
    <main id="pgmain">
     
     
     
     
     
     
     
   
   
   
   
   
   
   
   
   
   
   
   
   
<br>
     <form action="#" method="post">
         <h4>Currency >
     
   <div class="row form-group">
    <div class="col col-md-3">
    <div class="col col-md-9">
  <div class="form-check">
 </div> </h4>
  
    <font size = "2" color = "#000000">
        
   <div class="radio">
    <label for="radio01" class="form-check-label ">
  <input type="radio" id="radio01" name="radios" value="1" class="form-check-input" data-required="true" data-error-message="Selection Error" required > Currency Type ₹
    </label>
</div>
 
<div class="radio">
    <label for="radio02" class="form-check-label ">
  <input type="radio" id="radio02" name="radios" value="2" class="form-check-input" data-required="true" data-error-message="Selection Error" required > Currency Type $
    </label>
</div>

<div class="radio">
    <label for="radio03" class="form-check-label ">
  <input type="radio" id="radio03" name="radios" value="3" class="form-check-input" data-required="true" data-error-message="Selection Error" required > Currency Type €
    </label>
</div>
</font>

<br>
<font size = "3" color = "#b6b6b6"><?php echo "= Current Currency  : ".$GetAll['Currency'] ?> </font><br>


  </div>
    </div>
</div>
<br>
  <div class="form-actions form-group"> <button type="submit" class="button"  name ="buttonCurrency">Update currency </button></div>
    </form>

  
     
     
    
    
    

<?php 
if(!isset($_SESSION["OK"])):
header('Location: index.php'); endif; ?>

<?php if(isset($_POST['buttonCurrency'])){

if($_POST['radios'] == "1"){ $Funxxx = "₹"; }
if($_POST['radios'] == "2"){ $Funxxx = "$"; }
if($_POST['radios'] == "3"){ $Funxxx = "€"; }
$conn->query("UPDATE function_code SET Currency='$Funxxx' WHERE `id_path` = '1'");
?> <script type="text/javascript">
	 alert("Successfully Update Currency!");
window.location.href='index.php'; </script> <?php  } ?> 





    
    
     

<br>
<div class="card-body">
<form method="POST" autocomplete="off">
 <h4>YourKeysPrice >
<div><pre>

  <input placeholder="5Hours>" type="number" id="fname1" name="fname1" required> 
  <font size = "2" color = "#b6b6b6"> <?php echo "Current Rates : ".$GetAll['Hrs5'] ?> </font></input>
 
  <input placeholder="1Days>" type="number" id="fname2" name="fname2" required> 
  <font size = "2" color = "#b6b6b6"> <?php echo "Current Rates : ".$GetAll['Days1'] ?>  </sup></input>
 
  <input placeholder="7Days>" type="number" id="fname3" name="fname3" required> 
  <font size = "2" color = "#b6b6b6"> <?php echo "Current Rates : ".$GetAll['Days7'] ?>  </sup></input>
 
  <input placeholder="15Days>" type="number" id="fname4" name="fname4" required> 
  <font size = "2" color = "#b6b6b6"> <?php echo "Current Rates : ".$GetAll['Days15'] ?>  </sup></input>
 
  <input placeholder="30Days>" type="number" id="fname5" name="fname5" required> 
  <font size = "2" color = "#b6b6b6"> <?php echo "Current Rates : ".$GetAll['Days30'] ?>  </sup></input>
 
  <input placeholder="60Days>" type="number" id="fname6" name="fname6" required>  
  <font size = "2" color = "#b6b6b6"> <?php echo "Current Rates : ".$GetAll['Days60'] ?>  </sup></input>
 
  <pre>
  <button class="button" type="submit" name="lnUpdate">Update Your Rate</button>
</h4></form></div>



<style>
  .button1z {
  background-color: white;
  color: black;
  border: 2px solid #ff0000;
  font-size: 15px;
 /*padding: 8px 15px;*/
}  
</style>



<?php if(isset($_POST['lnUpdate'])){

$Funcation1 = $_POST['fname1'];
$Funcation2 = $_POST['fname2'];
$Funcation3 = $_POST['fname3'];
$Funcation4 = $_POST['fname4'];
$Funcation5 = $_POST['fname5'];
$Funcation6 = $_POST['fname6'];

$sql1 = "UPDATE function_code SET Hrs5='$Funcation1' WHERE `id_path` = '1'";
$sql2 = "UPDATE function_code SET Days1='$Funcation2' WHERE `id_path` = '1'";
$sql3 = "UPDATE function_code SET Days7='$Funcation3' WHERE `id_path` = '1'";
$sql4 = "UPDATE function_code SET Days15='$Funcation4' WHERE `id_path` = '1'";
$sql5 = "UPDATE function_code SET Days30='$Funcation5' WHERE `id_path` = '1'";
$sql6 = "UPDATE function_code SET Days60='$Funcation6' WHERE `id_path` = '1'";


if (mysqli_query($conn, $sql1)) {
  if (mysqli_query($conn, $sql2)) {
  if (mysqli_query($conn, $sql3)) {
  if (mysqli_query($conn, $sql4)) {
  if (mysqli_query($conn, $sql5)) {
  if (mysqli_query($conn, $sql6)) {
  
  ?>
  
  <script type="text/javascript">
	 alert("Successful update price!");
window.location.href='index.php'; </script> 

<?php
} else {
}
} else {
}
} else {
}
} else {
}
} else {
}
} else {
}

mysqli_close($conn);

}
?> 






<font color = "#000000">
  
  <div class="content">
<div class="animated fadeIn">

    <div class="row">

    <div class="col-lg-6">
  <div class="card">
<br>
<h2><div class="card-header">Generate Licence</div></h2>
<div class="card-body card-block">
    <form action="#" method="post">

   <div class="form-group">
<div class="input-group">
    <div class="input-group-addon"><i class="fa fa-tablet"></i></div>
    <input type="number" id="redxstudio_device" name="redxstudio_device" placeholder="Devices" class="form-control" data-required="true" data-error-message="Required" max ="100" required>
</div>
  </div>
  <br>
   <div class="form-group">
<div class="input-group">
    <div class="input-group-addon"><i class="fa fa-user"></i></div>
    <input type="text" id="redxstudio_prefs" name="redxstudio_prefs" placeholder="Your Name" class="form-control" data-required="true" data-error-message="Required" required>
</div>
  </div>
  
  <br>
  
     <div class="form-group">
<div class="input-group">
    <div class="input-group-addon"><i class="fa fa-tablet"></i></div>
    <input type="number" id="number" name="number" placeholder="Total Number of Keys" class="form-control" data-required="true" data-error-message="Required" max ="500" required>
</div>
  </div>
  
  <br>
  
   <div class="col col-md-3"><label class=" form-control-label">Key Validity :</label>
   
   <div class="row form-group">
    <div class="col col-md-3">
    <div class="col col-md-9">
  <div class="form-check">
 </div>
  
  <div class="radio">
    <label for="radio1" class="form-check-label ">
  <input type="radio" id="radio1" name="radios" value="1" class="form-check-input" data-required="true" data-error-message="Selection Error" required > 0 day / 1 hour
    </label>
</div>
<div class="radio">
    <label for="radio2" class="form-check-label ">
  <input type="radio" id="radio2" name="radios" value="5" class="form-check-input" data-required="true" data-error-message="Selection Error" required > 0 day / 5 hours
    </label>
</div>

<div class="radio">
    <label for="radio3" class="form-check-label ">
  <input type="radio" id="radio3" name="radios" value="24" class="form-check-input" data-required="true" data-error-message="Selection Error" required > 1 day / 24 hours
    </label>
</div>
<div class="radio">
    <label for="radio4" class="form-check-label ">
  <input type="radio" id="radio4" name="radios" value="168" class="form-check-input" data-required="true" data-error-message="Selection Error" required> 7 days / 168 hours
    </label>
</div>
<div class="radio">
    <label for="radio5" class="form-check-label ">
  <input type="radio" id="radio5" name="radios" value="360" class="form-check-input" data-required="true" data-error-message="Selection Error" required> 15 days / 360 hours
    </label>
</div>
<div class="radio">
    <label for="radio6" class="form-check-label ">
  <input type="radio" id="radio6" name="radios" value="720" class="form-check-input" data-required="true" data-error-message="Selection Error" required> 30 days / 720 hours
    </label>
</div>
<div class="radio">
    <label for="radio7" class="form-check-label ">
  <input type="radio" id="radio7" name="radios" value="1440" class="form-check-input" data-required="true" data-error-message="Selection Error" required> 60 days / 1440 hours
    </label>
</div>

  </div>
    </div>
</div>
<br>
  <div class="form-actions form-group"> <button type="submit" class="button"  name ="action">Generate your keys</button></div>
    </form>


    
</div>
  </div>
    </div>

</div>




    <?php  if(isset($_POST['action'])) {


if(!isset($_SESSION["OK"])):
header('Location: index.php'); endif;


// coletando dados do formulario:

    $devicee = $_POST['redxstudio_device'];
     $prefss = $_POST['redxstudio_prefs'];
$Numbers = $_POST['number'];
    $StartDate= date('Y-m-d H:i');
    
    if($Numbers > 500) {
  die("you can generate max 500 keys");
    }


$Devices = $_POST['radios'];
     


$hours = $_POST['radios'];
$hid = 24; $days = round($hours/$hid);
if ($days==0){ $Devicesx = "[$hours]Hours"; } else { $Devicesx = "[$days]Days"; }
    
  // start function 
 if ($Numbers > 500) {
   die("Less to 500 keys or no will register");
}


function generateRandomString($length) {
    $characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    $charactersLength = strlen($characters);
    $randomString = '';
    for ($i = 0; $i < $length; $i++) {
  $randomString .= $characters[rand(0, $charactersLength - 1)];
    }
    return $randomString;
}


   
$assd = str_replace(' ', '', $prefss);
$namealpha = $assd;
$int1 = strlen($namealpha); 
$int2 = 21 - $int1; $max = 31; $int69 = 41;



$keys = array(generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2),generateRandomString($int2));


$keysFuck = array(generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69),generateRandomString($int69));


$name = "KeysCreateDownload/$StartDatexx.txt"; 
echo '<p><a class="button1" href="download.php?file=' . urlencode($name) . '">DOWNLOAD YOUR KEY FILE</a></p></div>';


for($posicao = 0; $posicao < $Numbers; $posicao++)
{  
    
    if($posicao > 500) {
  die();
    }
    
$FuckUpUid = $keysFuck[$posicao];
$all = $namealpha."$Devices".$keys[$posicao];
$posicaoo = $posicao +1;

$query = $conn->query("INSERT INTO keys_code (`game`, `user_key`, `duration`, `expired_date`, `max_devices`, `devices`, `status`, `registrator`, `created_at`, `updated_at`, `key_reset_time`, `key_reset_token`) VALUES ('PUBG', '$all', '$Devices', NULL, '$devicee', NULL, '1', 'RedZONERROR', '$StartDate', '$StartDate', '3', '$FuckUpUid')");

$text = "$StartDate - Key: $all - Duration:$Devicesx & TotalDevice>[$devicee] \n\n";
$file = fopen($name, 'a');
fwrite($file, $text);
fclose($file);
?>







<p style="font-family:courier; font-size: 15px;"><?php echo $all; ?></p>









<?php

}
?>
<script type="text/javascript">
   if ( window.history.replaceState ) {
  window.history.replaceState( null, null, window.location.href );
}
</script>
<?php
    }
     
  



?>

   
      
    
   
<br>  
<br>
<br>
 </div> <!--.animated-->
    </div><!-- .content -->

  
     
     
     
     
     
     
     
     
     
     
     
     
     
     <script>
function copyToClipboard(element) {
  var $temp = $("<input>");
  $("body").append($temp);
  $temp.val($(element).text()).select();
  document.execCommand("copy");
  $temp.remove();
} </script>

     
     
     
     
     
     
     
     
     
     
     
     
     
     
     
    </main>
  </body>
</html>
