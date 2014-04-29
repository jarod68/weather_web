<!doctype html>
<html lang="en">
<head>
	<meta charset="utf-8">
  <?php include_once "include.php"; ?>
</head>
<body>

  <?php
    include_once "toolbar.php";
    toolbar::getInstance()->write("press");
  ?>
  
  
  <div id="core" class="container">
    <div class="row" id="temperatureContainer">
      <h3>Temperature</h3>
      <div id="dayTemp" style="max-width:800px;height: 300px;" class="col-md-8 jumbotron"></div>
    </div>
    <div class="row" id="monthTemperatureContainer">
      <h3>Temperature month</h3>
      <div id="meanMonthTemp" style="max-width:800px;height: 300px;" class="col-md-8 jumbotron" ></div>
    </div>
  </div>
</body>
</html>