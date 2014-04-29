/*
* Converts an SQL format date to a javascript Date instance
*/
function toDate(date){
	date.replace(/\s/g, "T");
	date = date + " UTC";
	var result =  new Date(date);

	return result;
}

function computeDateForParameter(date){
	return date.getUTCFullYear()+"/"+ (date.getUTCMonth()+1) +"/" + date.getDate() +" " + date.getUTCHours() +":" + date.getUTCMinutes() +":"+date.getUTCSeconds();
}

function computeDateForTooltips(date){

	return date.getHours() +":" + date.getMinutes();
}

function loadNow(){

	var result = null;
	$.ajax({
		'async': false,
		'global': false,
		'url': "./now.php",
		'dataType': "json",
		'success': function (json) {
			
			var arr = [];
			arr ['timestamp'] = toDate(json[0].timestamp);
			arr ['outdoor_temperature'] =json[0].outdoor_temperature;
			arr ['indoor_temp'] =json[0].indoor_temp;
			arr [ 'indoor_humidity'] =json[0].indoor_humidity;
			arr [ 'indoor_pressure'] =json[0].indoor_pressure ;
			
			result = arr;
		}
	});

	return result;

}

function loadDay(day){
	var result = null;
	$.ajax({
		'async': false,
		'global': false,
		'url': "./query.php?day="+computeDateForParameter(day),
		'dataType': "json",
		'success': function (json) {
			var arr = [];
			var lim = json.length;
			for (var i = 0; i < lim; i++){
				arr.push({timestamp : toDate(json[i].timestamp), outdoor_temperature: json[i].outdoor_temperature, indoor_temp: json[i].indoor_temp, indoor_humidity: json[i].indoor_humidity, indoor_pressure: json[i].indoor_pressure });
			}
			result = arr;
		}
	});

	return result;

}

function loadMean(from, to){

	var result = null;
	$.ajax({
		'async': false,
		'global': false,
		'url': "./mean.php?from=" + computeDateForParameter(from)+ "&to="+computeDateForParameter(to),
		'dataType': "json",
		'success': function (json) {
			var arr = [];
			var lim = json.length;
			for (var i = 0; i < lim; i++){
				arr.push({day : toDate(json[i].day), indoor_temp_mean: json[i].indoor_temp_mean, indoor_humidity_mean: json[i].indoor_humidity_mean, indoor_pressure_mean: json[i].indoor_pressure_mean, outdoor_temperature_mean: json[i].outdoor_temperature_mean });

			}
			result = arr;
		}
	});
	return result;

}

function loadTempChart(data){

	$("#dayTemp").dxChart({

		dataSource: data,
		type: 'stackedLine',
		commonSeriesSettings: {
			argumentField: 'timestamp'
		},
		scale: {
			valueType: "datetime"
		},
		series: [{
			name: 'outdoor_temperature',
			valueField: 'outdoor_temperature', 
			point: {
				size: '0.5'
			}
		},{
			name: 'indoor_temperature',
			valueField: 'indoor_temp', 
			point: {
				size: '0.5'
			}
		} ], valueAxis:{
			label: {
				customizeText: function () {
					return this.valueText + '&#176C';
				}
			}
		},
		argumentAxis: {
			argumentType: 'datetime',
			label: {
				format: 'HH:mm'
			},
			axisDivisionFactor: 50,
			grid: {
				visible: true
			}
		},  tooltip: {
			enabled: true,
			customizeText: function (label) {

				return  this.valueText + '&#176C, ' + computeDateForTooltips(new Date(this.argumentText)) ;
			}
		}

	});

}

function loadHumChart(data){

	$("#dayHum").dxChart({

		dataSource: data,
		type: 'stackedLine',
		commonSeriesSettings: {
			argumentField: 'timestamp'
		},
		scale: {
			valueType: "datetime"
		},
		series: [{
			name: 'indoor_humidity',
			valueField: 'indoor_humidity', 
			color: 'violet', 
			point: {
				size: '0.5'
			}
		}], valueAxis:{
			label: {
				customizeText: function () {
					return this.valueText + '%';
				}
			}
		},
		argumentAxis: {
			argumentType: 'datetime',
			label: {
				format: 'HH:mm'
			},
			axisDivisionFactor: 50,
			grid: {
				visible: true
			}
		},  tooltip: {
			enabled: true,
			customizeText: function (label) {

				return  this.valueText + '%, ' + computeDateForTooltips(new Date(this.argumentText)) ;
			}
		}

	});
}


function loadPressChart(data){

	$("#dayPress").dxChart({

		dataSource: data,
		type: 'stackedLine',
		commonSeriesSettings: {
			argumentField: 'timestamp'
		},
		scale: {
			valueType: "datetime"
		},
		series: [{
			name: 'indoor_pressure',
			valueField: 'indoor_pressure', 
			color: 'orange', 
			point: {
				size: '0.5'
			}
		}], valueAxis:{
			label: {
				customizeText: function () {
					return this.valueText + 'hPa';
				}
			}
		},
		argumentAxis: {
			argumentType: 'datetime',
			label: {
				format: 'HH:mm'
			},
			axisDivisionFactor: 50,
			grid: {
				visible: true
			}
		},  tooltip: {
			enabled: true,
			customizeText: function (label) {

				return  this.valueText + 'hPa, ' + computeDateForTooltips(new Date(this.argumentText)) ;
			}
		}

	});
}


function loadMonthTempChart(data){

	$("#meanMonthTemp").dxChart({

		dataSource: data,
		type: 'stackedBar',
		commonSeriesSettings: {
			argumentField: 'day'
		},
		scale: {
			valueType: "datetime"
		},

		series: [{
			name: 'outdoor_temperature_mean',
			valueField: 'outdoor_temperature_mean',
			type:'stackedBar'
		}], 
		argumentAxis: {
			argumentType: 'datetime',
			label: {
				format: 'dd/MM/yy'
			},
			axisDivisionFactor: 50,
			grid: {
				visible: true
			}
		},  tooltip: {
			enabled: true,
			customizeText: function (label) {
				var timestamp = new Date(this.argumentText);
				return  this.valueText + '&#176C, ' + timestamp.getUTCDate() + "/" + (timestamp.getUTCMonth()+1) + "/" + timestamp.getUTCFullYear() ;
			}
		}
	});
}

function loadMonthHumChart(data){

	$("#meanMonthHum").dxChart({

		dataSource: data,
		type: 'bar',
		commonSeriesSettings: {
			argumentField: 'day'
		},
		scale: {
			valueType: "datetime"
		},

		series: [{
			name: 'indoor_humidity_mean',
			valueField: 'indoor_humidity_mean',
			type:'bar'
		}], 
		argumentAxis: {
			argumentType: 'datetime',
			label: {
				format: 'dd/MM/yy'
			},
			axisDivisionFactor: 50,
			grid: {
				visible: true
			}
		},  tooltip: {
			enabled: true,
			customizeText: function (label) {
				var timestamp = new Date(this.argumentText);
				return  this.valueText + '&#176C, ' + timestamp.getUTCDate() + "/" + (timestamp.getUTCMonth()+1) + "/" + timestamp.getUTCFullYear() ;
			}
		}
	});
}

function loadMonthPressChart(data){

	$("#meanMonthPress").dxChart({

		dataSource: data,
		type: 'bar',
		commonSeriesSettings: {
			argumentField: 'day'
		},
		scale: {
			valueType: "datetime"
		},

		series: [{
			name: 'indoor_pressure_mean',
			valueField: 'indoor_pressure_mean',
			type:'bar'
		}], 
		argumentAxis: {
			argumentType: 'datetime',
			label: {
				format: 'dd/MM/yy'
			},
			axisDivisionFactor: 50,
			grid: {
				visible: true
			}
		},  tooltip: {
			enabled: true,
			customizeText: function (label) {
				var timestamp = new Date(this.argumentText);
				return  this.valueText + '&#176C, ' + timestamp.getUTCDate() + "/" + (timestamp.getUTCMonth()+1) + "/" + timestamp.getUTCFullYear() ;
			}
		}
	});
}

function loadNowOutTempGauge(value){

	$('#gaugeOutTemp').dxCircularGauge({
		scale: {
			startValue: -20,
			endValue: 50,
			majorTick: {
				tickInterval: 5
			}
		},
		rangeContainer: {
			palette: 'pastel',
			ranges: [
			{ startValue: -20, endValue: 0 },
			{ startValue: 0, endValue: 22 },
			{ startValue: 22, endValue: 50 },
			]
		},
		title: {
			text: 'Outdoor temperature '+value+ '&#176C',
			font: { size: 14 }
		},
		value: value
	});
}

function loadNowInTempGauge(value){

	$('#gaugeInTemp').dxCircularGauge({
		scale: {
			startValue: -20,
			endValue: 50,
			majorTick: {
				tickInterval: 5
			}
		},
		rangeContainer: {
			palette: 'pastel',
			ranges: [
			{ startValue: -20, endValue: 0 },
			{ startValue: 0, endValue: 22 },
			{ startValue: 22, endValue: 50 },
			]
		},
		title: {
			text: 'Indoor temperature '+value+ '&#176C',
			font: { size: 14 }
		},
		value: value
	});
}

function loadNowHumGauge(value){

	$('#gaugeHum').dxCircularGauge({
		scale: {
			startValue: 0,
			endValue: 100,
			majorTick: {
				tickInterval: 10
			}
		},
		rangeContainer: {
			palette: 'pastel',
			ranges: [
			{ startValue: 0, endValue: 20 },
			{ startValue: 20, endValue: 45 },
			{ startValue: 45, endValue: 100 },
			]
		},
		title: {
			text: 'Humidity '+value+ '%',
			font: { size: 14 }
		},
		value: value
	});
}

function loadNowPressGauge(value){

	$('#gaugePress').dxCircularGauge({
		scale: {
			startValue: 700,
			endValue: 1050,
			majorTick: {
				tickInterval: 20
			}
		},
		rangeContainer: {
			palette: 'pastel',
			ranges: [
			{ startValue: 700, endValue: 900 },
			{ startValue: 900, endValue: 1020 },
			{ startValue: 1020, endValue: 1050 },
			]
		},
		title: {
			text: 'Pressure '+value+ 'hPa',
			font: { size: 14 }
		},
		value: value
	});
}


function loadGauges(){

	var now = loadNow();
	loadNowOutTempGauge(now['outdoor_temperature']);
	loadNowInTempGauge(now['indoor_temp']);
	loadNowHumGauge(now['indoor_humidity']);
	loadNowPressGauge(now['indoor_pressure']);
}

$(function () {
	var date = getDateCookie();
	var today = loadDay(date);

	loadTempChart(today);
	loadHumChart(today);
	loadPressChart(today);

	var oneMonthAgo = getDateCookie();
	oneMonthAgo.setDate(oneMonthAgo.getDate() - 31);
	var month = loadMean(oneMonthAgo, date);
	loadMonthTempChart(month);
	loadMonthHumChart(month);
	loadMonthPressChart(month);

	loadGauges();

});