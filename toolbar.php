<?php
class toolbar{

  protected static $instance; 

  private $active = "";

  private function __construct(){

  }

  private function __clone() { 

  } 
  
  public static function getInstance()
  {
    if (!isset(self::$instance)) 
      self::$instance = new self; 

    return self::$instance;
  }

  public function write($type) { 
   echo '<div class="navbar navbar-fixed-top navbar-inverse" role="navigation">';
   echo '<div class="container">';
   echo '<div class="navbar-header">';
   echo '<button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">';
   echo '<span class="sr-only">Toggle navigation</span>';
   echo '<span class="icon-bar"></span>';
   echo '<span class="icon-bar"></span>';
   echo '<span class="icon-bar"></span>';
   echo '</button>';
   echo '<a class="navbar-brand" href="./index.php">Weather station</a>';
   echo '</div>';
   echo '<div class="collapse navbar-collapse">';
   echo '<ul class="nav navbar-nav">';

   if($type == "temp")
    echo '<li id="tempNav" class="active">';
  else
    echo '<li id="tempNav">';

  echo '<a href="./temperature.php">Temperature</a></li>';

  if($type == "press")
    echo '<li id="pressNav" class="active">';
  else
    echo '<li id="pressNav">';
  echo '<a href="./pressure.php">Pressure</a></li>';

  if($type == "hum")
    echo '<li id="humNav" class="active">';
  else
    echo '<li id="humNav">';
  echo '<a href="./humidity.php">Humidity</a></li>';

  echo '<li> <input class="form-control" placeholder="Today" type="text" id="datepicker"  style="margin-top:5px;width:100px"/><li>';
  echo '</ul>';
  echo '</div>';
  echo '</div>';
  echo '</div>';
}

}

?>


