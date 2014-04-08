<?php
class Config{

	static $databases = array('online' => array('host' => 'localhost',
	 'user' => 'root',
	 'password' => 'rasberry',
	 'dbname' => 'weather'),

	'local' => array('host' => 'localhost',
	 'user' => 'root',
	 'password' => 'root',
	 'dbname' => 'weather')
	  );
}

?>