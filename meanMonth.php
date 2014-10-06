<?php
include_once "configured_weather_db.php";

$db = configured_weather_db::getInstance();

if (isset($_GET["from"]) && isset($_GET["to"])){
	
	$timeZone = 'GMT';  // +2 hours 
    date_default_timezone_set($timeZone); 

	$begin = new DateTime($_GET["from"]);
	$end = new DateTime( $_GET["to"]);
	$begin->modify('first day of this month');
	$end->modify('last day of this month');

	$interval = DateInterval::createFromDateString('1 month');
	$period = new DatePeriod($begin, $interval, $end);

	$json = '[';

	foreach ( $period as $dt ){
		$monthBegin =  $dt->format("Y-m-d H:i:s");

		if($json != '[')
			$json = $json . ', ';

		$json = $json. $db->computeMeansMonth(array('month' =>  $monthBegin));

	}
	$json = $json . ']';

	print_r($json);
}

?>