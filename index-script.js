 var day;
  var month;
  
  $(function() {

    $( "#datepicker" ).datepicker({
      maxDate:0,
      altField: "#actualDate",
      onSelect: function (date) {
        var dateArray = date.split("/");

        var today = new  Date(dateArray[2], dateArray[0]-1, dateArray[1], 0, 0, 0, 0);

        var oneMonthAgo = new  Date(today.getTime());
        oneMonthAgo.setDate(oneMonthAgo.getDate() - 31);
        
        day = loadDay(today);
        loadTempChart(day);
        loadHumChart(day);
        loadPressChart(day);

        month = loadMean(oneMonthAgo, today);
        loadMonthTempChart(month);
        loadMonthHumChart(month);
        loadMonthPressChart(month);
      }
    });
    $( "#datepicker" ).datepicker('setDate', new Date());
  });

  function displayTemp() {
    $( "#temperatureContainer" ).show();
    $( "#thumidityContainer" ).hide();
    $( "#pressureContainer" ).hide();
    $( "#monthTemperatureContainer" ).show();
    $( "#monthPressureContainer" ).hide();
    $( "#monthHumidityContainer" ).hide();

    $( "#tempNav" ).attr({class: 'active' });
    $( "#pressNav" ).attr({class: '' });
    $( "#humNav" ).attr({class: '' });

    loadTempChart(day);
    loadMonthTempChart(month);
  }

  function displayHum() {
   $( "#temperatureContainer" ).hide();
   $( "#thumidityContainer" ).show();
   $( "#pressureContainer" ).hide();
   $( "#monthTemperatureContainer" ).hide();
   $( "#monthPressureContainer" ).hide();
   $( "#monthHumidityContainer" ).show();

   $( "#tempNav" ).attr({class: '' });
   $( "#pressNav" ).attr({class: '' });
   $( "#humNav" ).attr({class: 'active' });

   loadHumChart(day);
   loadMonthHumChart(month);
 }

 function displayPress() {
  $( "#temperatureContainer" ).hide();
  $( "#thumidityContainer" ).hide();
  $( "#pressureContainer" ).show();
  $( "#monthTemperatureContainer" ).hide();
  $( "#monthPressureContainer" ).show();
  $( "#monthHumidityContainer" ).hide();

  $( "#tempNav" ).attr({class: '' });
  $( "#pressNav" ).attr({class: 'active' });
  $( "#humNav" ).attr({class: '' });

  loadPressChart(day);
  loadMonthPressChart(month);
}

$(function() {
  displayTemp();
});