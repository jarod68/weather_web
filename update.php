#! /usr/bin/php
<?php
include_once "configured_weather_db.php";

define("IN_TEMP_ATTR"	, "iT");
define("IN_HUM_ATTR"	, "iH");
define("INPRES_ATTR"	, "iP");
define("OUTTEMP_ATTR"	, "oT");

$ip = '192.168.1.177';

$curl = curl_init('http://' . $ip );
curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
$json = curl_exec($curl);

//$json = '{"iT":"22.0","oT":"16.0","iH":"44.0","iP":"1003.2"}';

if ( isset($json) && $json != ""){
	$decoded = json_decode($json, true);

	$db = configured_weather_db::getInstance();

	$db->insertValues (array(	'indoor_temp' => $decoded[constant("IN_TEMP_ATTR")], 
		'indoor_humidity' 		=> $decoded[constant("IN_HUM_ATTR")], 
		'indoor_pressure' 		=> $decoded[constant("INPRES_ATTR")], 
		'outdoor_temperature' 	=> $decoded[constant("OUTTEMP_ATTR")]));

}
?>