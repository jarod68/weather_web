<?php
include_once "configured_weather_db.php";

$timeZone = 'GMT';  // +2 hours 
    date_default_timezone_set($timeZone); 

$format = 'c';
$db 		= configured_weather_db::getInstance();

$now 		= json_decode($db->lastValues(), true);

$refTime 	= new DateTime($now[0]['timestamp']);
$fourAgoRefTime = clone $refTime;
//$fourAgoRefTime->add(new DateInterval('PT-4H'));
$fourAgoRefTime = $fourAgoRefTime->modify('-4 hours');
$fourAgo = 
$db->retrieveValues(array('from' =>  $fourAgoRefTime->format(DateTime::W3C ), 'to' => $refTime->format(DateTime::W3C )));
//$eightAgo 	= json_decode($db->retrieveValues(array('from' =>  ' ', 'to' => ' ')), true);

print_r($now['timestamp']);

//print_r($fourAgoRefTime);
print_r($fourAgo);

?>