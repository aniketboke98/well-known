<?php
session_start();
include 'redx.php';

$StartDatexx = date('Y m d  H i s');

if(!isset($_SESSION["OK"])):
 	header('Location: index.php');
 endif;


$GetX = "SELECT * FROM function_code WHERE id_path = '1'";
$GetXx = mysqli_query($conn, $GetX);
$GetAll = mysqli_fetch_array($GetXx);

?>



<!DOCTYPE html>
<html>
  <head>
    <title>Admin Funcation</title>
    <meta name="robots" content="noindex" />
    <meta name="viewport" content="width=device-width,initial-scale=1"/>
    <link rel="stylesheet" href="adminPanelSet.css" />
    
    
       
    
<link rel="apple-touch-icon" sizes="180x180" href="IconCreateFuncationXx/apple-touch-icon.png">
<link rel="icon" type="image/png" sizes="32x32" href="IconCreateFuncationXx/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="IconCreateFuncationXx/favicon-16x16.png">
<link rel="manifest" href="IconCreateFuncationXx/site.webmanifest">
<link rel="mask-icon" href="IconCreateFuncationXx/safari-pinned-tab.svg" color="#5bbad5">
<meta name="msapplication-TileColor" content="#603cba">
<meta name="theme-color" content="#ffffff">



  </head>
  <body>
    <!-- (A) SIDEBAR -->
    <div id="pgside">
<a href="../make/index.php">
  <i class="ico">&#9733;</i>
  <i class="txt">Login</i>
</a>
 <a href="../make/index1.php">
  <i class="ico">&#9733;</i>
  <i class="txt">Make Key</i>
</a>
<a href="../make/index2.php" class="current">
  <i class="ico">&#9728;</i>
  <i class="txt">Control Panel</i>
</a>

    </div>

    <!-- (B) MAIN -->
    <main id="pgmain">
  
  
  
  
  
  
     
     
     
     
     
     
     
     
     
     
<h3>UPDATE SERVER</h3>

<div class="card-body">
<form method="POST" autocomplete="off">
<div class="form-row m-b-55">
    
<div class="radio">
<label for="radio3" class="form-check-label ">
<input type="radio" id="radio" name="radios" value="1" class="form-check-input" data-required="true" data-error-message="Select first"required> Server On </label>

</div>
<div class="radio">
<label for="radio3" class="form-check-label ">
<input type="radio" id="radio" name="radios" value="2" class="form-check-input" data-required="true" data-error-message="Select first"required> Server Offline </label>
     
<h5>Server Off Massage</h5>
<textarea rows = "1" name = "myInput" id="myInput" required> </textarea>

</p>
<div>
<font size = "3" color = "#b6b6b6"><?php echo "= Current Status : ".$GetAll['Online'] ?> </font> </div>
<div>
<font size = "1" color = "#b6b6b6"><?php echo "= Current Maintenance Massage : ".$GetAll['Maintenance'] ?> </font> </div>

<h5><button class="butto" type="submit" name="Update">Update Massage & Server Now</button>
</h5></div> </form></div> <br></div>



<div class="card-body">
<form method="POST" autocomplete="off">
<div class="form-row m-b-55">




<h4>Extend All Key Time</h4>
<h5>As Hours ></h5>
<input rows = "1" type="number" name = "myInputKey" id="myInputKey" required> </input>
<h5><button class="butt" type="submit" name="UpdateKey">Extend To All Server Key Now</button>
 </form>
<h5><button class="butto" type="submit" name="Reset">> Reset All Key From Server Now</button>
<br></div></div><br></div>



<div class="card-body">
<form method="POST">
<div class="form-row m-b-55">
<h3>Server Status</h3>
<h5>Aimbot ></h5>
<h5><button class="butto" type="submit" name="onAimbot">Aimbot On<button> <button class="butt" type="submit" name="offAimbot">Aimbot Off</button></h5>

<h5>BulletTrack ></h5>
 <h5><button class="butto" type="submit" name="onBulletTrack">BulletTrack On<button> <button class="butt" type="submit" name="offBulletTrack">BulletTrack Off</button></h5>
</div>
</div>

<h5>MemoryHack ></h5>
 <h5><button class="button btn--radius-2" type="submit" name="onMemoryHack">MemoryHack On<button> <button class="butt" type="submit" name="offMemoryHack">MemoryHack Off</button> </h5>
 </div>
 </div>
 </h2></div></form></div>
 
 <div class="card-body">
<form method="POST" autocomplete="off">
<div class="form-row m-b-55">
<pre> <h3>YourModName ></h3> <textarea rows = "1" name = "myInput2" id="myInput2" required> </textarea> </h2> </pr>
<font size = "3" color = "#b6b6b6"><?php echo "= Current ModName  : ".$GetAll['ModName'] ?> </font> </pr>
<button class="button" type="submit" name="Update2">     Update Your Mode Name Now  >     </button>
</h2></div></form></div>



    <style>
.button-wrap {
  position: relative;
}
.butt {
  display: inline-block;
  /*padding: 6px 10px;*/
  cursor: pointer;
  border-radius: 5px;
  border: 2px solid #0073ff;
  background-color: #ffffff;
  font-size: 13px;
  font-weight: bold;
  color: #000000;
}
.butto {
  display: inline-block;
  /*padding: 6px 10px;*/
  cursor: pointer;
  border-radius: 3px;
  background-color: #0073ff;
  font-size: 13px;
  font-weight: bold;
  color: #fff;
}
.button {
  display: inline-block;
  /*padding: 6px 10px;*/
  cursor: pointer;
  border-radius: 3px;
  background-color: #0073ff;
  font-size: 15px;
  font-weight: bold;
  color: #fff;
}
.button1 {
  display: inline-block;
  padding: 5px 11px;
  cursor: pointer;
  border-radius: 5px;
  background-color: #e8e8e8;
  font-size: 10px;
  font-weight: bold;
  color: #000;
}
    </style>


  
<br>  
<br>
<br>







<?php 
if(!isset($_SESSION["OK"])):
header('Location: index.php'); endif; ?>


<?php if(isset($_POST['Update'])){
if($_POST['radios'] == "1"){ $Funxxx = "true"; }
if($_POST['radios'] == "2"){ $Funxxx = "false"; }
$Funcation = $_POST['myInput'];
$conn->query("UPDATE function_code SET Online='$Funxxx' WHERE `id_path` = '1'");
$conn->query("UPDATE function_code SET Maintenance='$Funcation' WHERE `id_path` = '1'");
?> <script type="text/javascript">
	 alert("Successfully Update!");
window.location.href='index.php'; </script> <?php  } ?> 


<?php if(isset($_POST['UpdateKey'])){
$time = $_POST['myInputKey'];
$sql = "UPDATE keys_code SET expired_date = DATE_ADD(expired_date, INTERVAL $time HOUR)";
  if (mysqli_query($conn, $sql)) { ?>
<script type="text/javascript">
	 alert("Successful add hours");
window.location.href='index.php'; </script> 
<?php } else { } mysqli_close($conn); } ?> 


<?php if(isset($_POST['Reset'])){
$conn->query("UPDATE keys_code SET devices=NULL");
?> <script type="text/javascript">
	 alert("Successfully Reset!");
window.location.href='index.php'; </script> <?php  } ?> 


<?php if(isset($_POST['onAimbot'])){
$Funcation = "true";
$conn->query("UPDATE function_code SET Aimbot='$Funcation' WHERE `id_path` = '1'");
?> <script type="text/javascript">
	 alert("Successfully on Aimbot!");
window.location.href='index2.php'; </script> <?php  } ?> 

<?php if(isset($_POST['offAimbot'])){
$Funcation = "false";
$conn->query("UPDATE function_code SET Aimbot='$Funcation' WHERE `id_path` = '1'");
?> <script type="text/javascript">
	 alert("Successfully off Aimbot!");
window.location.href='index2.php'; </script> <?php  } ?> 

<?php if(isset($_POST['onBulletTrack'])){
$Funcation = "true";
$conn->query("UPDATE function_code SET Bullet='$Funcation' WHERE `id_path` = '1'");
?> <script type="text/javascript">
	 alert("Successfully on BulletTrack!");
window.location.href='index2.php'; </script> <?php  } ?> 

<?php if(isset($_POST['offBulletTrack'])){
$Funcation = "false";
$conn->query("UPDATE function_code SET Bullet='$Funcation' WHERE `id_path` = '1'");
?> <script type="text/javascript">
	 alert("Successfully off BulletTrack!");
window.location.href='index2.php'; </script> <?php  } ?> 

<?php if(isset($_POST['onMemoryHack'])){
$Funcation = "true";
$conn->query("UPDATE function_code SET Memory='$Funcation' WHERE `id_path` = '1'");
?> <script type="text/javascript">
	 alert("Successfully on MemoryHack!");
window.location.href='index2.php'; </script> <?php  } ?> 

<?php if(isset($_POST['offMemoryHack'])){
$Funcation = "false";
$conn->query("UPDATE function_code SET Memory='$Funcation' WHERE `id_path` = '1'");
?> <script type="text/javascript">
	 alert("Successfully off MemoryHack!");
window.location.href='index2.php'; </script> <?php  } ?> 

<?php if(isset($_POST['Update2'])){
$Funcation = $_POST['myInput2'];
$conn->query("UPDATE function_code SET ModName='$Funcation' WHERE `id_path` = '1'");
?> <script type="text/javascript">
	 alert("Successfully Update ModName!");
window.location.href='index.php'; </script> <?php  } ?> 

     
  
  
  
  
  
     
    </main>
  </body>
</html>
