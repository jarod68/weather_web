function setDateCookie(date){

  var stringDate = date.getUTCFullYear()+"-"+ date.getMonth()+"-" + date.getDate();

  $.cookie('selectedDay', stringDate);
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
      console.log("select "+today);
      var oneMonthAgo = new  Date(today.getTime());
      oneMonthAgo.setDate(oneMonthAgo.getDate() - 31);

      var day = loadDay(today);
      loadTempChart(day);
      loadHumChart(day);
      loadPressChart(day);

      var month = loadMean(oneMonthAgo, today);
      loadMonthTempChart(month);
      loadMonthHumChart(month);
      loadMonthPressChart(month);

      setDateCookie(today);
    }
  });
  $( "#datepicker" ).datepicker('setDate', getDateCookie());
});