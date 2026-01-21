<?php
session_start();
    include('.envxx');  
    
    $username = $_POST['user'];  
    $password = $_POST['pass'];  

 
if($username == "1") {

if($password == "RedZONERROR") {

    

     $_SESSION['OK'] = true;
  
echo'<script> window.location="index1.php"; </script> ';
     

} else {
session_destroy(); 
echo'<script> window.location="index.php"; </script> ';

}

} else {
session_destroy(); 
echo'<script> window.location="index.php"; </script> ';

}



?>  