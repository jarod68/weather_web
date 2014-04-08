<?php
include_once "configured_weather_db.php";

//$db = new weather_db(array('host' => 'localhost','user' => 'root','password' => 'raspberry','dbname' => 'weather'));
$db = configured_weather_db::getInstance();

if (isset($_GET["from"]) && isset($_GET["to"]) ){

	print_r($db->retrieveValues(array('from' =>  htmlspecialchars($_GET["from"]), 'to' =>  htmlspecialchars($_GET["to"]))));

}elseif (isset($_GET["from"])){

	print_r($db->retrieveValues(array('from' =>  htmlspecialchars($_GET["from"]))));

}elseif (isset($_GET["to"])){

	print_r($db->retrieveValues(array('to' => htmlspecialchars($_GET["to"]))));

}
elseif (isset($_GET["day"])){

	print_r($db->retrieveValues(array('day' => htmlspecialchars($_GET["day"]))));

}else{

	print_r($db->retrieveValues());	
}

?>