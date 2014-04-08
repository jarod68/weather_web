<?php
include_once "weather_db.php";

class configured_weather_db extends weather_db{

	protected static $instance; 

 	protected function __construct(){
		parent::__construct1(array(	'host' 		=> 'localhost',
			'user' 		=> 'root',
			'password' 	=> 'raspberry',
			'dbname' 	=> 'weather'));
	}

  protected function __clone() { 

  } 
  
  public static function getInstance()
  {
    if (!isset(self::$instance)) 
      self::$instance = new self; 


	return self::$instance;
	}

}
?>