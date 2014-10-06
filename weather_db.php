<?php
class weather_db{

	private $link 		;
	private $host 		;
	private $user 		;
	private $password  	;
	private $dbname 	;

	public function __construct1(){

		$arg_list = func_get_args()[0];

		$this->host 	= 	$arg_list['host'];
		$this->user 	= 	$arg_list['user'];
		$this->password = 	$arg_list['password'];
		$this->dbname 	= 	$arg_list['dbname'];
	}

	protected function connect(){

		$sqli = mysqli_connect($this->host, $this->user, $this->password, $this->dbname) or die("Error " . mysqli_error($sqli));
		$this->link = $sqli;
	}

	protected  function close(){
		$this->link->close();
		$this->link = NULL;
	}

	protected function handleError(){

		if (mysqli_connect_errno($this->link)) {
			echo "Error during database connection : " . mysqli_connect_error();
		}
	}

	public function insertValues (){


		$arg_list = func_get_args()[0];
		$this->connect();

		$request = "INSERT INTO record(indoor_temp, indoor_humidity, indoor_pressure, outdoor_temperature) VALUES (". $arg_list['indoor_temp'] . ",". $arg_list['indoor_humidity'] ."," . $arg_list['indoor_pressure']. "," .$arg_list['outdoor_temperature'].");";
		$result = $this->link->query($request);
		$this->handleError();
		$this->close();
	}

	public function retrieveValues (){


		$arg_list = func_get_args()[0];

		$request = 'SELECT indoor_temp, indoor_humidity, indoor_pressure, outdoor_temperature, timestamp FROM record';

		if ((isset($arg_list['from']) && isset($arg_list['to']))){
			$request = $request . ' WHERE timestamp > "' . $arg_list['from'] . '" AND timestamp < "' . $arg_list['to'] . '"';
		} elseif (isset($arg_list['from'])) {
			$request = $request . ' WHERE timestamp > "' . $arg_list['from'] .'"';
		} elseif (isset($arg_list['to'])) {
			$request = $request . ' WHERE timestamp < "' . $arg_list['to'] .'"';
		}elseif(isset($arg_list['day'])){
			$request = $request . ' WHERE DAYOFYEAR(timestamp) = DAYOFYEAR("' . $arg_list['day'] .'") AND YEAR(timestamp) = YEAR("' . $arg_list['day'] .'")';
		}

		return self::retrieveValues_request( array('request' => $request  ));
	}

	private function retrieveValues_request (){


		$arg_list = func_get_args()[0];
		
		$request = $arg_list['request'];

		$this->connect();
		$result = $this->link->query($request);
		$this->handleError();
		$toEncode = array();
		$i=0;
		while($row = mysqli_fetch_array($result))
		{
			$entry = array('timestamp' => $row['timestamp'], 'indoor_temp' => (double)$row['indoor_temp'], 'indoor_humidity' => (double)$row['indoor_humidity'], 'indoor_pressure' => (double)$row['indoor_pressure'], 'outdoor_temperature' => (double)$row['outdoor_temperature'] );

			array_push($toEncode, $entry);
		}
		$this->close();
		$json = json_encode($toEncode);
		
		return $json;
	}

	public function computeMeansDay (){


		$arg_list = func_get_args()[0];
		


		if(!isset($arg_list['day'])) die();
		
				$request = 'SELECT ROUND(AVG( indoor_temp ),2) AS indoor_temp_mean, ROUND(AVG( indoor_humidity ),2) AS indoor_humidity_mean, ROUND(AVG( indoor_pressure ),2) AS indoor_pressure_mean, ROUND(AVG( outdoor_temperature ),2) AS outdoor_temperature_mean
		FROM record  WHERE DAYOFYEAR(timestamp) = DAYOFYEAR("' . $arg_list['day'] .'") AND YEAR(timestamp) = YEAR("' . $arg_list['day'] .'")';

		$this->connect();
		$result = $this->link->query($request);
		$this->handleError();

		$row = mysqli_fetch_array($result);
		
		$toEncode = array('day' => $arg_list['day'],'indoor_temp_mean' => (double)$row['indoor_temp_mean'], 'indoor_humidity_mean' => (double)$row['indoor_humidity_mean'], 'indoor_pressure_mean' => (double)$row['indoor_pressure_mean'], 'outdoor_temperature_mean' => (double)$row['outdoor_temperature_mean']);

		$this->close();
		$json = json_encode($toEncode);
		
		return $json;
	}

	public function computeMeansMonth (){


		$arg_list = func_get_args()[0];
		


		if(!isset($arg_list['month'])) die();
		
				$request = 'SELECT ROUND(AVG( indoor_temp ),2) AS indoor_temp_mean, ROUND(AVG( indoor_humidity ),2) AS indoor_humidity_mean, ROUND(AVG( indoor_pressure ),2) AS indoor_pressure_mean, ROUND(AVG( outdoor_temperature ),2) AS outdoor_temperature_mean
		FROM record  WHERE MONTH(timestamp) = MONTH("' . $arg_list['month'] .'") AND YEAR(timestamp) = YEAR("' . $arg_list['month'] .'")';

		$this->connect();
		$result = $this->link->query($request);
		$this->handleError();

		$row = mysqli_fetch_array($result);
		$toEncode = array('month' => DateTime::createFromFormat("Y-m-d H:i:s", $arg_list['month'])->format('M Y'),'indoor_temp_mean' => (double)$row['indoor_temp_mean'], 'indoor_humidity_mean' => (double)$row['indoor_humidity_mean'], 'indoor_pressure_mean' => (double)$row['indoor_pressure_mean'], 'outdoor_temperature_mean' => (double)$row['outdoor_temperature_mean']);

		$this->close();
		$json = json_encode($toEncode);
		
		return $json;
	}

	public function lastValues (){

		$request = 'SELECT id, indoor_temp, indoor_humidity, indoor_pressure, outdoor_temperature, timestamp FROM record WHERE id=(SELECT id FROM record ORDER BY id DESC LIMIT 1)';

		return self::retrieveValues_request( array('request' => $request  ));
	}
}
?>