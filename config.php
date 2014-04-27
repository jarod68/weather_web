<?php
class Config{

	static $databases = array('online' => array('host' => 'localhost',
	 'user' => 'root',
	 'password' => 'raspberry',
	 'dbname' => 'weather'),

	'local' => array('host' => '127.0.0.1',
	 'user' => 'root',
	 'password' => 'root',
	 'dbname' => 'weather')
	  );
}

?>