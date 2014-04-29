<!doctype html>
<html lang="fr">
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
    <div class="row" id="thumidityContainer">
      <h3>Humidity</h3  >
        <div id="dayHum" style="max-width:800px;height: 300px;" class="col-md-8 jumbotron" ></div>
      </div>
      <div class="row" id="monthHumidityContainer">
        <h3>Humidity month</h3>
        <div id="meanMonthHum" style="max-width:800px;height: 300px;" class="col-md-8 jumbotron" ></div>
      </div>
    </div>
  </body>
  </html>