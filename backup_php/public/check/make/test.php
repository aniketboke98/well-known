<?php
$user_agent = $_SERVER['HTTP_USER_AGENT'];
$whatIWant = substr($user_agent, strpos($user_agent, "(") + 1);    
$whatIWantx = substr($whatIWant, strpos($whatIWant, ")") + 1);    
$whatIWantx = str_replace($whatIWantx,"",$whatIWant);
$whatIWantx = str_replace(")","",$whatIWantx);
$whatIWantx = str_replace(" ","",$whatIWantx);
$whatIWantx = str_replace(";","-",$whatIWantx);

echo $whatIWantx;
?>

<p>

 </p>

<?php
if (strpos($_SERVER['HTTP_USER_AGENT'], 'Chrome') !== false
  || strpos($_SERVER['HTTP_USER_AGENT'], 'CriOS') !== false) {
    
    
    echo "true";
} else {
    
     echo "false";
}

?>

