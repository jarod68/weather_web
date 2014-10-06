function setDateCookie(date){

  var stringDate = date.getUTCFullYear()+"-"+ date.getMonth()+"-" + date.getDate();

  $.cookie('selectedDay', stringDate, { expires: 0.0417 }); //valid for 1 hr
}

function getDateCookie(){

  var retrieved = $.cookie('selectedDay');
  
  if(retrieved == null){
    var now = new Date();
    setDateCookie(now);
    return now;
  }


  var dateArray = retrieved.split("-");

  return new  Date(dateArray[0], dateArray[1], dateArray[2], 0, 0, 0, 0);
}

$(function() {

  $( "#datepicker" ).datepicker({
    maxDate:0,
    altField: "#actualDate",
    onSelect: function (date) {
      var dateArray = date.split("/");

      var today = new  Date(dateArray[2], dateArray[0]-1, dateArray[1], 0, 0, 0, 0);
      var oneMonthAgo = new  Date(today.getTime());
      oneMonthAgo.setDate(oneMonthAgo.getDate() - 31);

      var day = loadDay(today);
      loadTempChart(day);
      loadHumChart(day);
      loadPressChart(day);

      var month = loadMeanDay(oneMonthAgo, today);
      loadDayMeanTempChart(month);
      loadDayMeanHumChart(month);
      loadDayMeanPressChart(month);


      var oneYearAgo = new Date(today.getFullYear(), today.getMonth(), 1);
      var endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
      oneYearAgo.setDate(oneYearAgo.getDate() - 365);
      var year = loadYear(oneYearAgo, endOfMonth);
      loadYearTempChart(year);
      loadYearPressChart(year);
      loadYearHumChart(year);

      setDateCookie(today);
    }
  });
  $( "#datepicker" ).datepicker('setDate', getDateCookie());
});