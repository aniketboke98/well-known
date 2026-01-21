<?php 
session_start();
include 'redx.php';

$StartDatexx = date('Y m d  H i s');

if(!isset($_SESSION["OK"])):
header('Location: index.php'); endif;


//$StartDatexx = str_replace(' ', '', $StartDatex);
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
  background-color: #000000;
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
  color: #000;
}
    </style>




    
    
    
    
  </head>
  <body>
    <!-- (A) SIDEBAR -->
    <div id="pgside">
 <a href="../make/index.php" class="current">
  <i class="ico">&#9728;</i>
  <i class="txt">Login</i>
</a>
 <a href="../make/index1.php">
  <i class="ico">&#9733;</i>
  <i class="txt">Make Key</i>
</a>
<a href="../make/index2.php">
  <i class="ico">&#9733;</i>
  <i class="txt">Control Panel</i>
</a>

    </div>

    <!-- (B) MAIN -->
    <main id="pgmain">
     
     
     
     
     
     

     
     
     
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
  color: #ff0000;
}
    </style>


     
     
     
     
     
     
     
     
     
   
<?php
session_start();

$base_url="http://".$_SERVER['SERVER_NAME'].dirname($_SERVER["REQUEST_URI"].'?').'/';
$base_url = str_replace("/check/make/","",$base_url);


if(!isset($_SESSION["OK"])){ ?>
 
    
<body>
    <h1><a id="Login">Login</a></h1>
    <h1><a id="Successful">Unsuccessful</a></h1>
   <button class = "butt" onclick="self.close()">=  Click - Here - To - Return  =</button>
</p>
  
   
<?php } else { ?>
    
    
<body>   
    <h1><a id="Login">Login</a></h1>
    <h1><a id="Successful">Successful</a></h1>
<button class = "butt" onclick="self.close()">=  Click - Here - To - Return  =</button>
</p>


<?php } ?>

     
     
     
     
     
     
     
     
     
     
     
     
    </main>
  </body>
</html>
