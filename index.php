<!doctype html>
<html lang="en">
<head>
	<meta charset="utf-8">
  <?php include_once "include.php"; ?>
</head>
<body>

  <?php
    include_once "toolbar.php";
    toolbar::getInstance()->write();
  ?>
  

  <div id="core" class="container">
      <div class="row" id="gaugeContainer">
        <h3>Gauges</h3>
        <div id="gaugeOutTemp" style="max-width:400px;height: 300px;margin:20px;" class="col-md-8 jumbotron"></div>
        <div id="gaugeInTemp" style="max-width:400px;height: 300px;margin:20px;" class="col-md-8 jumbotron"></div>
        <div id="gaugeHum" style="max-width:400px;height: 300px;margin:20px;" class="col-md-8 jumbotron"></div>
        <div id="gaugePress" style="max-width:400px;height: 300px;margin:20px;" class="col-md-8 jumbotron"></div>
      </div>
    </div>
  </body>
  </html>