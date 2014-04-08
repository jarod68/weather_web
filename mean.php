<?php
include_once "configured_weather_db.php";

//$db = new weather_db(array('host' => 'localhost','user' => 'root','password' => 'raspberry','dbname' => 'weather'));
$db = configured_weather_db::getInstance();

if (isset($_GET["from"]) && isset($_GET["to"])){


	$begin = new DateTime( $_GET["from"] );
	$end = new DateTime( $_GET["to"]);

	$interval = DateInterval::createFromDateString('1 day');
	$period = new DatePeriod($begin, $interval, $end);

	$json = '[';

	foreach ( $period as $dt ){
		$day =  $dt->format("Y-m-j H:i:s");

		if($json != '[')
			$json = $json . ', ';

		$json = $json. $db->computeMeans(array('day' =>  $day));

	}
	$json = $json . ']';

	print_r($json);
}

?>