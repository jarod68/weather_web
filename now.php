<?php
include_once "configured_weather_db.php";

$db = configured_weather_db::getInstance();

print_r($db->lastValues());

?>